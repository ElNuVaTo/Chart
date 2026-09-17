import { Trash2, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import BookMap from './BookMap';

const Levels = ({
  level,
  index,
  setBook,
  addBook,
  deleteBook,
  setLevel,
  handleAddLevel,
  deleteLevel,
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          {index > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => deleteLevel(index)}
              className="text-muted-foreground"
            >
              <Trash2 />
              Eliminar nivel
            </Button>
          )}
        </div>

        <Button type="button" variant="outline" onClick={handleAddLevel}>
          <Plus />
          Crear nuevo nivel
        </Button>
      </div>

      <FieldSet className="py-10">
        <div className="flex items-start gap-4">
          <FieldLegend className="flex size-9 shrink-0 items-center justify-center bg-muted font-mono text-xs font-medium">
            {String(index + 1).padStart(2, '0')}
          </FieldLegend>

          <FieldDescription className="mt-1">
            Define el contenido y las lecturas de esta sección.
          </FieldDescription>
        </div>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor={`level-name-${index}`}>
              Nombre de la sección
            </FieldLabel>

            <FieldContent>
              <Input
                id={`level-name-${index}`}
                type="text"
                value={level.name}
                placeholder="Ej: Empezando el día"
                className="max-w-xl"
                onChange={(event) =>
                  setLevel(index, 'name', event.target.value)
                }
              />

              <FieldDescription>
                Define un nombre para identificar esta sección. Ejemplos:
                Introducción, Fundamentos, Avanzando...
              </FieldDescription>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor={`level-takeaway-${index}`}>
              Idea clave
            </FieldLabel>

            <FieldContent>
              <Textarea
                id={`level-takeaway-${index}`}
                value={level.takeaway}
                placeholder="¿Qué debería llevarse el usuario de este nivel?"
                className="min-h-24 max-w-2xl resize-none"
                onChange={(event) =>
                  setLevel(index, 'takeaway', event.target.value)
                }
              />

              <FieldDescription>
                Resume la idea principal o el aprendizaje que debería quedar
                después de completar este nivel.
              </FieldDescription>
            </FieldContent>
          </Field>

          <BookMap
            level={level}
            levelIndex={index}
            setBook={setBook}
            addBook={addBook}
            deleteBook={deleteBook}
          />
        </FieldGroup>
      </FieldSet>
    </>
  );
};

export default Levels;
