"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Upload, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

interface PersonalData {
  name: string;
  email: string;
  phone: string;
  location: string;
  photo: string;
  photoPosition: { x: number; y: number };
}

interface StepPersonalDataProps {
  data: PersonalData;
  onChange: (data: PersonalData) => void;
}

export function StepPersonalData({ data, onChange }: StepPersonalDataProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleChange = (field: keyof PersonalData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas ficheiros de imagem.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onChange({ 
            ...data, 
            photo: result,
            photoPosition: { x: 50, y: 50 }
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!data.photo) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    const newX = Math.max(0, Math.min(100, (data.photoPosition?.x || 50) + deltaX / 2));
    const newY = Math.max(0, Math.min(100, (data.photoPosition?.y || 50) + deltaY / 2));
    
    handleChange("photoPosition", { x: newX, y: newY });
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-6">
      {/* Photo Upload */}
      <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
        <div 
          className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center overflow-hidden relative cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {data.photo ? (
            <img 
              src={data.photo} 
              alt="Foto" 
              className="w-full h-full object-cover pointer-events-none select-none"
              style={{
                objectPosition: `${data.photoPosition?.x || 50}% ${data.photoPosition?.y || 50}%`
              }}
              draggable={false}
            />
          ) : (
            <User className="w-12 h-12 text-white" />
          )}
          {data.photo && (
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all flex items-center justify-center">
              <Move className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
          id="photo-upload-input"
        />
        <Button 
          type="button"
          variant="outline" 
          className="gap-2"
          onClick={triggerFileInput}
        >
          <Upload className="w-4 h-4" />
          {data.photo ? "Alterar Foto" : "Carregar Foto (Opcional)"}
        </Button>
        {data.photo && (
          <p className="text-xs text-blue-600 dark:text-blue-400 text-center font-medium">
            <Move className="w-3 h-3 inline mr-1" />
            Arraste a foto para ajustar a posição dentro do círculo
          </p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Recomendado: foto profissional em fundo neutro (máx 5MB)
        </p>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Nome Completo *
        </Label>
        <Input
          id="name"
          placeholder="Ex: João Silva"
          value={data.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="text-base"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Email *
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="joao.silva@email.com"
          value={data.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="text-base"
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Telemóvel *
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+351 912 345 678"
          value={data.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="text-base"
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location" className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Localização
        </Label>
        <Input
          id="location"
          placeholder="Lisboa, Portugal"
          value={data.location}
          onChange={(e) => handleChange("location", e.target.value)}
          className="text-base"
        />
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Dica:</strong> Certifique-se de que os seus dados estão corretos. 
          O currículo final será enviado para o email indicado.
        </p>
      </div>
    </div>
  );
}
