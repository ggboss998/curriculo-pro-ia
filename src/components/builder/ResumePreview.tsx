"use client";

import { User, Briefcase, GraduationCap, Award, FileText, Languages, BookOpen, Calendar, Mail, Phone, MapPin } from "lucide-react";

interface ResumePreviewProps {
  data: any;
  template?: string;
}

export function ResumePreview({ data, template = "modern" }: ResumePreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    return `${months[parseInt(month) - 1]}/${year}`;
  };

  const levelLabels: Record<string, string> = {
    compreendo: "Compreendo",
    falo: "Falo",
    compreendo_falo: "Compreendo e Falo",
  };

  // Template Moderno - Layout tradicional com header colorido
  const ModernTemplate = () => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-red-500/50 dark:text-red-600/50 text-[80px] font-black transform rotate-[-45deg] select-none tracking-wider leading-tight">
          CURRÍCULO<br/>PRO IA
        </div>
      </div>

      <div className="relative z-20">
        {data.personalData.name && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="flex items-center gap-6">
              {data.personalData.photo && (
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 flex-shrink-0">
                  <img 
                    src={data.personalData.photo} 
                    alt="Foto" 
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: `${data.personalData.photoPosition?.x || 50}% ${data.personalData.photoPosition?.y || 50}%`
                    }}
                  />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{data.personalData.name}</h2>
                <div className="space-y-1 text-sm opacity-90">
                  {data.personalData.email && <p>{data.personalData.email}</p>}
                  <div className="flex items-center gap-3">
                    {data.personalData.phone && <span>{data.personalData.phone}</span>}
                    {data.personalData.location && (
                      <>
                        {data.personalData.phone && <span>•</span>}
                        <span>{data.personalData.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-8 space-y-6 text-sm">
          {data.presentation && (
            <div>
              <h3 className="text-sm font-bold text-blue-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                <User className="w-4 h-4" />
                Perfil Profissional
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.presentation}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-blue-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Experiência Profissional
              </h3>
              <div className="space-y-4">
                {data.experience.map((exp: any) => (
                  <div key={exp.id} className="border-l-2 border-blue-600 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{exp.position || "Cargo"}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {exp.company || "Empresa"} • {formatDate(exp.startDate) || "Início"} -{" "}
                      {exp.current ? "Presente" : formatDate(exp.endDate) || "Fim"}
                    </p>
                    {exp.description && (
                      <p className="text-gray-700 dark:text-gray-300 mt-2 text-xs whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-blue-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Formação Académica
              </h3>
              <div className="space-y-3">
                {data.education.map((edu: any) => (
                  <div key={edu.id} className="border-l-2 border-blue-600 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {edu.degree || "Grau"} em {edu.field || "Área"}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      {edu.institution || "Instituição"} •{" "}
                      {edu.current ? "Em curso" : formatDate(edu.endDate) || "Ano"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.certifications?.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-blue-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Formações Complementares
              </h3>
              <div className="space-y-2">
                {data.certifications.map((cert: any) => (
                  <div key={cert.id} className="border-l-2 border-blue-600 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-xs">{cert.name || "Curso"}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      {cert.institution || "Instituição"} • {cert.year || "Ano"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.languages?.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-blue-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                <Languages className="w-4 h-4" />
                Línguas
              </h3>
              <div className="space-y-2">
                {data.languages.map((lang: any) => (
                  <div key={lang.id} className="flex items-center justify-between border-l-2 border-blue-600 pl-4">
                    <span className="font-medium text-gray-900 dark:text-white text-xs">{lang.language || "Língua"}</span>
                    <span className="text-gray-600 dark:text-gray-400 text-xs">{levelLabels[lang.level] || lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-blue-600 mb-3 uppercase tracking-wide flex items-center gap-2">
                <Award className="w-4 h-4" />
                Competências
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: string) => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-100 rounded-full text-xs font-medium border border-blue-300 dark:border-blue-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Template Minimalista - Layout limpo com sidebar
  const MinimalistTemplate = () => (
    <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-red-500/50 dark:text-red-600/50 text-[80px] font-black transform rotate-[-45deg] select-none tracking-wider leading-tight">
          CURRÍCULO<br/>PRO IA
        </div>
      </div>

      <div className="relative z-20 flex">
        {/* Sidebar esquerda */}
        <div className="w-1/3 bg-gray-900 dark:bg-black text-white p-6 space-y-6">
          {data.personalData.photo && (
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20">
              <img 
                src={data.personalData.photo} 
                alt="Foto" 
                className="w-full h-full object-cover"
                style={{
                  objectPosition: `${data.personalData.photoPosition?.x || 50}% ${data.personalData.photoPosition?.y || 50}%`
                }}
              />
            </div>
          )}

          {data.personalData.name && (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">{data.personalData.name}</h2>
              <div className="space-y-2 text-xs opacity-80">
                {data.personalData.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    <span className="break-all">{data.personalData.email}</span>
                  </div>
                )}
                {data.personalData.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    <span>{data.personalData.phone}</span>
                  </div>
                )}
                {data.personalData.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span>{data.personalData.location}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {data.skills.length > 0 && (
            <div>
              <h3 className="text-xs font-bold mb-3 uppercase tracking-wider border-b border-white/20 pb-2">
                Competências
              </h3>
              <div className="space-y-2">
                {data.skills.map((skill: string) => (
                  <div key={skill} className="text-xs bg-white/10 px-2 py-1 rounded">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.languages?.length > 0 && (
            <div>
              <h3 className="text-xs font-bold mb-3 uppercase tracking-wider border-b border-white/20 pb-2">
                Línguas
              </h3>
              <div className="space-y-2">
                {data.languages.map((lang: any) => (
                  <div key={lang.id} className="text-xs">
                    <div className="font-medium">{lang.language || "Língua"}</div>
                    <div className="opacity-70 text-[10px]">{levelLabels[lang.level] || lang.level}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 p-8 space-y-6 text-sm">
          {data.presentation && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide border-b-2 border-gray-900 dark:border-white pb-1">
                Perfil
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs">{data.presentation}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide border-b-2 border-gray-900 dark:border-white pb-1">
                Experiência
              </h3>
              <div className="space-y-4">
                {data.experience.map((exp: any) => (
                  <div key={exp.id}>
                    <h4 className="font-bold text-gray-900 dark:text-white text-xs">{exp.position || "Cargo"}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-[10px] mt-1">
                      {exp.company || "Empresa"} | {formatDate(exp.startDate) || "Início"} - {exp.current ? "Presente" : formatDate(exp.endDate) || "Fim"}
                    </p>
                    {exp.description && (
                      <p className="text-gray-700 dark:text-gray-300 mt-2 text-[10px] whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide border-b-2 border-gray-900 dark:border-white pb-1">
                Formação
              </h3>
              <div className="space-y-3">
                {data.education.map((edu: any) => (
                  <div key={edu.id}>
                    <h4 className="font-bold text-gray-900 dark:text-white text-xs">
                      {edu.degree || "Grau"} em {edu.field || "Área"}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-[10px]">
                      {edu.institution || "Instituição"} | {edu.current ? "Em curso" : formatDate(edu.endDate) || "Ano"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.certifications?.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide border-b-2 border-gray-900 dark:border-white pb-1">
                Certificações
              </h3>
              <div className="space-y-2">
                {data.certifications.map((cert: any) => (
                  <div key={cert.id}>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-[10px]">{cert.name || "Curso"}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-[10px]">
                      {cert.institution || "Instituição"} • {cert.year || "Ano"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Template Criativo - Layout com cards e cores vibrantes
  const CreativeTemplate = () => (
    <div className="bg-gradient-to-br from-pink-50 to-orange-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl shadow-2xl overflow-hidden border border-pink-200 dark:border-gray-800 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-red-500/50 dark:text-red-600/50 text-[80px] font-black transform rotate-[-45deg] select-none tracking-wider leading-tight">
          CURRÍCULO<br/>PRO IA
        </div>
      </div>

      <div className="relative z-20 p-8 space-y-6">
        {/* Header centralizado */}
        {data.personalData.name && (
          <div className="text-center bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-2xl p-8 shadow-lg">
            {data.personalData.photo && (
              <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                <img 
                  src={data.personalData.photo} 
                  alt="Foto" 
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: `${data.personalData.photoPosition?.x || 50}% ${data.personalData.photoPosition?.y || 50}%`
                  }}
                />
              </div>
            )}
            <h2 className="text-3xl font-black mb-3">{data.personalData.name}</h2>
            <div className="flex items-center justify-center gap-4 text-sm opacity-90 flex-wrap">
              {data.personalData.email && <span>{data.personalData.email}</span>}
              {data.personalData.phone && <span>•</span>}
              {data.personalData.phone && <span>{data.personalData.phone}</span>}
              {data.personalData.location && <span>•</span>}
              {data.personalData.location && <span>{data.personalData.location}</span>}
            </div>
          </div>
        )}

        {/* Grid de 2 colunas */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Coluna esquerda */}
          <div className="space-y-6">
            {data.presentation && (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
                <h3 className="text-sm font-black text-pink-600 dark:text-pink-400 mb-3 uppercase tracking-wide">
                  💼 Sobre Mim
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs">{data.presentation}</p>
              </div>
            )}

            {data.skills.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
                <h3 className="text-sm font-black text-pink-600 dark:text-pink-400 mb-3 uppercase tracking-wide">
                  ⭐ Competências
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1 bg-gradient-to-r from-pink-100 to-orange-100 dark:from-pink-950 dark:to-orange-950 text-pink-900 dark:text-pink-100 rounded-full text-xs font-bold border border-pink-300 dark:border-pink-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.languages?.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
                <h3 className="text-sm font-black text-pink-600 dark:text-pink-400 mb-3 uppercase tracking-wide">
                  🌍 Línguas
                </h3>
                <div className="space-y-2">
                  {data.languages.map((lang: any) => (
                    <div key={lang.id} className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 dark:text-white text-xs">{lang.language || "Língua"}</span>
                      <span className="text-gray-600 dark:text-gray-400 text-xs">{levelLabels[lang.level] || lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Coluna direita */}
          <div className="space-y-6">
            {data.experience.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
                <h3 className="text-sm font-black text-pink-600 dark:text-pink-400 mb-3 uppercase tracking-wide">
                  💼 Experiência
                </h3>
                <div className="space-y-4">
                  {data.experience.map((exp: any) => (
                    <div key={exp.id} className="border-l-4 border-pink-500 pl-4">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs">{exp.position || "Cargo"}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-[10px] mt-1">
                        {exp.company || "Empresa"} • {formatDate(exp.startDate) || "Início"} - {exp.current ? "Presente" : formatDate(exp.endDate) || "Fim"}
                      </p>
                      {exp.description && (
                        <p className="text-gray-700 dark:text-gray-300 mt-2 text-[10px] whitespace-pre-line">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.education.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
                <h3 className="text-sm font-black text-pink-600 dark:text-pink-400 mb-3 uppercase tracking-wide">
                  🎓 Formação
                </h3>
                <div className="space-y-3">
                  {data.education.map((edu: any) => (
                    <div key={edu.id} className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs">
                        {edu.degree || "Grau"} em {edu.field || "Área"}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-[10px]">
                        {edu.institution || "Instituição"} • {edu.current ? "Em curso" : formatDate(edu.endDate) || "Ano"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.certifications?.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
                <h3 className="text-sm font-black text-pink-600 dark:text-pink-400 mb-3 uppercase tracking-wide">
                  📜 Certificações
                </h3>
                <div className="space-y-2">
                  {data.certifications.map((cert: any) => (
                    <div key={cert.id}>
                      <h4 className="font-bold text-gray-900 dark:text-white text-[10px]">{cert.name || "Curso"}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-[10px]">
                        {cert.institution || "Instituição"} • {cert.year || "Ano"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Template Profissional - Layout executivo clássico
  const ProfessionalTemplate = () => (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-300 dark:border-gray-800 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-red-500/50 dark:text-red-600/50 text-[80px] font-black transform rotate-[-45deg] select-none tracking-wider leading-tight">
          CURRÍCULO<br/>PRO IA
        </div>
      </div>

      <div className="relative z-20">
        {/* Header simples e elegante */}
        {data.personalData.name && (
          <div className="bg-gray-800 dark:bg-gray-950 text-white p-8 border-b-4 border-gray-600">
            <div className="flex items-start gap-6">
              {data.personalData.photo && (
                <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-600 flex-shrink-0">
                  <img 
                    src={data.personalData.photo} 
                    alt="Foto" 
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: `${data.personalData.photoPosition?.x || 50}% ${data.personalData.photoPosition?.y || 50}%`
                    }}
                  />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-3 tracking-tight">{data.personalData.name}</h2>
                <div className="grid grid-cols-2 gap-2 text-sm opacity-90">
                  {data.personalData.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      <span>{data.personalData.email}</span>
                    </div>
                  )}
                  {data.personalData.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      <span>{data.personalData.phone}</span>
                    </div>
                  )}
                  {data.personalData.location && (
                    <div className="flex items-center gap-2 col-span-2">
                      <MapPin className="w-3 h-3" />
                      <span>{data.personalData.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-8 space-y-6 text-sm">
          {data.presentation && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-5 bg-gray-800 dark:bg-gray-600"></div>
                Resumo Profissional
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs">{data.presentation}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-5 bg-gray-800 dark:bg-gray-600"></div>
                Experiência Profissional
              </h3>
              <div className="space-y-4">
                {data.experience.map((exp: any) => (
                  <div key={exp.id} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">{exp.position || "Cargo"}</h4>
                      <span className="text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap ml-4">
                        {formatDate(exp.startDate) || "Início"} - {exp.current ? "Presente" : formatDate(exp.endDate) || "Fim"}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-2">{exp.company || "Empresa"}</p>
                    {exp.description && (
                      <p className="text-gray-700 dark:text-gray-300 text-xs whitespace-pre-line leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {data.education.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-wide flex items-center gap-2">
                  <div className="w-1 h-5 bg-gray-800 dark:bg-gray-600"></div>
                  Formação Académica
                </h3>
                <div className="space-y-3">
                  {data.education.map((edu: any) => (
                    <div key={edu.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs">
                        {edu.degree || "Grau"} em {edu.field || "Área"}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-[10px] mt-1">
                        {edu.institution || "Instituição"}
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-[10px]">
                        {edu.current ? "Em curso" : formatDate(edu.endDate) || "Ano"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.skills.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-wide flex items-center gap-2">
                  <div className="w-1 h-5 bg-gray-800 dark:bg-gray-600"></div>
                  Competências-Chave
                </h3>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill: string) => (
                      <span key={skill} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {data.certifications?.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-5 bg-gray-800 dark:bg-gray-600"></div>
                Certificações e Formações
              </h3>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
                <div className="grid md:grid-cols-2 gap-3">
                  {data.certifications.map((cert: any) => (
                    <div key={cert.id}>
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs">{cert.name || "Curso"}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-[10px]">
                        {cert.institution || "Instituição"} • {cert.year || "Ano"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {data.languages?.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-5 bg-gray-800 dark:bg-gray-600"></div>
                Idiomas
              </h3>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
                <div className="grid grid-cols-2 gap-3">
                  {data.languages.map((lang: any) => (
                    <div key={lang.id} className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white text-xs">{lang.language || "Língua"}</span>
                      <span className="text-gray-600 dark:text-gray-400 text-xs">{levelLabels[lang.level] || lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Renderizar template baseado na seleção
  const renderTemplate = () => {
    switch (template) {
      case "minimalist":
      case "ats":
        return <MinimalistTemplate />;
      case "creative":
      case "colorful":
        return <CreativeTemplate />;
      case "professional":
      case "executive":
      case "european":
        return <ProfessionalTemplate />;
      case "modern":
      case "tech":
      case "clean":
      default:
        return <ModernTemplate />;
    }
  };

  // Empty State
  if (!data.personalData.name &&
      !data.presentation &&
      data.experience.length === 0 &&
      data.education.length === 0 &&
      data.skills.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 text-center py-12 px-8">
        <FileText className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
        <p className="text-gray-500 dark:text-gray-400">
          A pré-visualização aparecerá aqui
          <br />
          conforme preenche os dados
        </p>
      </div>
    );
  }

  return renderTemplate();
}
