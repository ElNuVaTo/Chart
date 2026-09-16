import { useCallback, useEffect, useState } from "react";
import { FileImage, Trash2, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Front = ({ title, desc, cover, setTitle, setDesc, setCover }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!cover) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(cover);

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [cover]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setCover(null);
      return;
    }

    setCover(selectedFile);
  };

  const handlePaste = useCallback(
    (event) => {
      const items = event.clipboardData?.items;

      if (!items) {
        return;
      }

      for (const item of items) {
        if (!item.type.startsWith("image/")) {
          continue;
        }

        const pastedFile = item.getAsFile();

        if (!pastedFile) {
          continue;
        }

        const extension = pastedFile.type.split("/")[1];

        const imageFile = new File([pastedFile], `cover-${Date.now()}.${extension}`, {
          type: pastedFile.type,
        });

        setCover(imageFile);

        event.preventDefault();

        return;
      }
    },
    [setCover],
  );

  useEffect(() => {
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

  const handleRemoveCover = () => {
    setCover(null);

    const input = document.getElementById("cover");

    if (input) {
      input.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <FieldSet>
      <FieldLegend>Portada del chart</FieldLegend>

      <FieldDescription>Presenta el tema, enfoque e idea principal.</FieldDescription>

      <FieldGroup>
        {/* Título */}
        <Field>
          <FieldLabel htmlFor="title">Título</FieldLabel>

          <FieldContent>
            <Input id="title" name="title" type="text" value={title} placeholder="Título del chart" onChange={(event) => setTitle(event.target.value)} />

            <FieldDescription>Un nombre claro y reconocible.</FieldDescription>
          </FieldContent>
        </Field>

        {/* Descripción */}
        <Field>
          <FieldLabel htmlFor="description">Descripción</FieldLabel>

          <FieldContent>
            <Textarea
              id="description"
              name="description"
              value={desc}
              placeholder="Describe brevemente tu chart..."
              className="min-h-28 resize-none"
              onChange={(event) => setDesc(event.target.value)}
            />

            <FieldDescription>
              Indica qué aprenderás y qué conocimientos adquirirás al completar el chart, o cuenta una historia que complemente su contenido.
            </FieldDescription>
          </FieldContent>
        </Field>

        {/* Portada */}
        <Field>
          <FieldLabel htmlFor="cover">
            Portada <span className="text-muted-foreground">PNG, JPG, WEBP</span>
          </FieldLabel>

          <FieldContent>
            {!cover ? (
              <label
                htmlFor="cover"
                className="group flex h-64 cursor-pointer flex-col items-center justify-center border border-dashed px-6 text-center transition-colors hover:border-foreground hover:bg-muted/30"
              >
                <div className="mb-4 flex size-10 items-center justify-center border bg-muted transition-colors group-hover:bg-accent">
                  <Upload className="size-5 text-muted-foreground" />
                </div>

                <p className="text-sm font-medium">Sube una imagen</p>

                <p className="mt-1 text-xs text-muted-foreground">Haz clic para seleccionar o pega una imagen</p>

                <input id="cover" name="cover" type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={handleFileChange} />
              </label>
            ) : (
              <div className="relative h-64 overflow-hidden border">
                {preview && <img src={preview} alt="Vista previa" className="size-full object-cover" />}

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/70 p-3 text-white">
                  <div className="flex min-w-0 items-center gap-3">
                    <FileImage className="size-4 shrink-0" />

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">{cover.name}</p>

                        <Badge variant="secondary">{cover.type.split("/")[1].toUpperCase()}</Badge>
                      </div>

                      <p className="text-xs text-white/60">{formatFileSize(cover.size)}</p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveCover}
                    className="shrink-0 text-white hover:bg-white/10 hover:text-white"
                    aria-label="Eliminar portada"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </FieldContent>

          <FieldDescription>Representación visual de la idea y el contenido principal.</FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};

export default Front;
