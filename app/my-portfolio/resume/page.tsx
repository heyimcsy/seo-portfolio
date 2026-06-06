import {getResume} from "@/lib/content";
import ProfileImage from "@/components/resume/ProfileImage";
import {Activity, Certificate, Education, Experience, Project} from "@/types";


export default function ResumePage() {
  const resume = getResume();
  const { basicInfo, introduction, skills, experiences, projects, education, activities, certificates } = resume;

  return (
    <div className="space-y-10">
      {/* 기본 정보 */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <ProfileImage src={basicInfo.photo} name={basicInfo.name} />
          <div className="flex-1 space-y-3">
            <h1 className="text-2xl font-bold text-gray-900">{basicInfo.name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
              <ContactItem icon="✉" label={basicInfo.email} href={`mailto:${basicInfo.email}`} />
              <ContactItem icon="📞" label={basicInfo.phone} />
              {basicInfo.github && (
                <ContactItem icon="🐙" label="GitHub" href={basicInfo.github} />
              )}
              {basicInfo.blog && (
                <ContactItem icon="✍" label="Blog" href={basicInfo.blog} />
              )}
              <ContactItem icon="📍" label={basicInfo.location} />
            </div>
          </div>
        </div>
      </section>

      {/* 자기소개 */}
      <Section title="자기소개">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{introduction}</p>
      </Section>

      {/* 기술 스택 */}
      <Section title="기술 스택">
        <div className="space-y-3">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex items-start space-x-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-30 pt-1 flex-shrink-0">
                {categoryLabel(category)}
              </span>
              <div className="flex flex-wrap gap-2">
                {(items as string[]).map((skill) => (
                  <span key={skill} className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 경력 */}
      {experiences.length > 0 && (
        <Section title="경력">
          <div className="space-y-6">
            {experiences.map((exp: Experience, i: number) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-900 mt-1.5 flex-shrink-0" />
                  {i < experiences.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                </div>
                <div className="pb-6 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <h3 className="font-semibold text-gray-900">{exp.company}</h3>
                    <span className="text-sm text-gray-500">{exp.position}</span>
                    <span className="text-xs text-gray-400 ml-auto">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                  <ul className="mt-2 space-y-1">
                    {exp.achievements.map((a, j) => (
                      <li key={j} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-gray-400 flex-shrink-0">•</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 프로젝트 */}
      {projects.length > 0 && (
        <Section title="프로젝트">
          <div className="space-y-6">
            {projects.map((proj: Project, i: number) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                  <span className="text-xs text-gray-400">{proj.startDate} – {proj.endDate}</span>
                </div>
                <p className="text-sm text-gray-600">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="space-y-1">
                  {proj.details.map((d, j) => (
                    <li key={j} className="text-sm text-gray-700 flex gap-2">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3 pt-1">
                  {proj.links.github && (
                    <a href={proj.links.github} target="_blank" rel="noreferrer"
                      className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-2">
                      GitHub
                    </a>
                  )}
                  {proj.links.demo && (
                    <a href={proj.links.demo} target="_blank" rel="noreferrer"
                      className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-2">
                      Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 학력 */}
      {education.length > 0 && (
        <Section title="학력">
          <div className="space-y-3">
            {education.map((edu: Education, i: number) => (
              <div key={i} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-medium text-gray-900">{edu.institution}</span>
                <span className="text-sm text-gray-600">{edu.major} ({edu.degree})</span>
                <span className="text-xs text-gray-400 ml-auto">{edu.startDate} – {edu.endDate}</span>
                {edu.note && <p className="w-full text-sm text-gray-500 mt-0.5">{edu.note}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 활동 */}
      {activities.length > 0 && (
        <Section title="활동">
          <div className="space-y-3">
            {activities.map((act: Activity, i: number) => (
              <div key={i} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-medium text-gray-900">{act.name}</span>
                <span className="text-sm text-gray-500">{act.organization}</span>
                <span className="text-xs text-gray-400 ml-auto">{act.startDate} – {act.endDate}</span>
                {act.description && <p className="w-full text-sm text-gray-600 mt-0.5">{act.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 자격증 */}
      {certificates.length > 0 && (
        <Section title="자격증">
          <div className="space-y-2">
            {certificates.map((cert: Certificate, i: number) => (
              <div key={i} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-medium text-gray-900">{cert.name}</span>
                <span className="text-sm text-gray-500">{cert.issuer}</span>
                <span className="text-xs text-gray-400 ml-auto">{cert.date}</span>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
      <h2 className="text-base font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">{title}</h2>
      {children}
    </section>
  );
}

function ContactItem({ icon, label, href }: { icon: string; label: string; href?: string }) {
  const content = (
    <span className="flex items-center gap-1.5">
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-gray-900">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}

function categoryLabel(key: string): string {
  const map: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    database: "DB",
    tools: "Tools",
      collaboration: "Collaboration",
  };
  return map[key] ?? key;
}
