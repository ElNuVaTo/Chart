import { useState } from 'react';

import Levels from './components/levels/Levels';
import Front from './components/front/Front';
import { Button } from '@/components/ui/button';
import { supabase } from '../../lib/supabase';

const DefaultFormatBook = {
  title: '',
  src: '',
  key: '',
  author: '',
  publishYear: '',
  notes: '',
};

const DefaultMain = {
  name: '',
  takeaway: '',
  books: [structuredClone(DefaultFormatBook)],
};

const PagesForm = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [cover, setCover] = useState(null);

  const [levels, setLevels] = useState([structuredClone(DefaultMain)]);

  const setLevel = (levelIndex, field, value) => {
    setLevels((prev) =>
      prev.map((level, index) =>
        index === levelIndex
          ? {
              ...level,
              [field]: value,
            }
          : level
      )
    );
  };
  const addLevel = () => {
    setLevels((prev) => [...prev, structuredClone(DefaultMain)]);
  };
  const handleAddLevel = () => {
    addLevel();
    setStep(levels.length + 1);
  };

  const deleteLevel = (levelIndex) => {
    setLevels((prev) => {
      if (prev.length === 1) {
        return prev;
      }

      const nextLevels = prev.filter((_, index) => index !== levelIndex);
      const deletedStep = levelIndex + 1;

      setStep((currentStep) => {
        if (currentStep === deletedStep) {
          return Math.min(currentStep, nextLevels.length);
        }

        if (currentStep > deletedStep) {
          return currentStep - 1;
        }

        return currentStep;
      });

      return nextLevels;
    });
  };
  const setBook = (levelIndex, bookIndex, field, value) => {
    setLevels((prev) =>
      prev.map((level, index) => {
        if (index !== levelIndex) {
          return level;
        }

        return {
          ...level,
          books: level.books.map((book, index) =>
            index === bookIndex
              ? {
                  ...book,
                  [field]: value,
                }
              : book
          ),
        };
      })
    );
  };
  const addBook = (levelIndex, book) => {
    setLevels((prev) =>
      prev.map((level, index) => {
        if (index !== levelIndex) {
          return level;
        }

        const firstBookIsEmpty =
          level.books.length === 1 && !level.books[0].key;

        const newBook = {
          ...structuredClone(book),
          notes: '',
        };

        return {
          ...level,
          books: firstBookIsEmpty ? [newBook] : [...level.books, newBook],
        };
      })
    );
  };
  const deleteBook = (levelIndex, bookIndex) => {
    setLevels((prev) =>
      prev.map((level, index) => {
        if (index !== levelIndex) {
          return level;
        }

        return {
          ...level,
          books: level.books.filter((_, index) => index !== bookIndex),
        };
      })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !title.trim() ||
      !cover ||
      levels.length === 0 ||
      levels.some((level) => !level.name.trim())
    ) {
      console.error('¡Te falta rellenar algunos datos!');
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error('No hay usuario autenticado');
      return;
    }

    const extension = cover.name.split('.').pop();

    const filePath = `${user.id}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from('chart-covers')
      .upload(filePath, cover);

    if (uploadError) {
      console.error('Error subiendo portada:', uploadError);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('chart-covers')
      .getPublicUrl(filePath);

    const coverUrl = publicUrlData.publicUrl;

    if (!coverUrl) {
      console.error('No se pudo obtener la URL de la portada');

      /* LIMPIAR ARCHIVO SUBIDO */
      await supabase.storage.from('chart-covers').remove([filePath]);

      return;
    }

    const { error } = await supabase.from('chart').insert({
      user_id: user.id,
      title: title.trim(),
      description: desc,
      cover_url: coverUrl,
      levels,
    });

    if (error) {
      console.error('Error creando chart:', error);

      await supabase.storage.from('chart-covers').remove([filePath]);

      return;
    }

    console.log('Chart creado correctamente');
  };

  const [step, setStep] = useState(0);
  const totalSteps = levels.length + 1;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-3xl px-4 py-8"
      >
        {step === 0 && (
          <Front
            title={title}
            desc={desc}
            cover={cover}
            setTitle={setTitle}
            setDesc={setDesc}
            setCover={setCover}
          />
        )}

        {step > 0 && (
          <Levels
            level={levels[step - 1]}
            index={step - 1}
            setBook={setBook}
            addBook={addBook}
            deleteBook={deleteBook}
            setLevel={setLevel}
            handleAddLevel={handleAddLevel}
            deleteLevel={deleteLevel}
          />
        )}

        <div className="mt-8 flex justify-between">
          <Button
            type="button"
            variant="outline"
            disabled={step === 0}
            onClick={() => setStep((prev) => prev - 1)}
          >
            Atrás
          </Button>

          {step < totalSteps - 1 ? (
            <Button type="button" onClick={() => setStep((prev) => prev + 1)}>
              Siguiente
            </Button>
          ) : (
            <Button type="submit">Publicar chart</Button>
          )}
        </div>
      </form>
    </>
  );
};

export default PagesForm;
