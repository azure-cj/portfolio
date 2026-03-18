import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 px-6 md:px-12 lg:px-24"
      aria-labelledby="contact-heading"
    >
      {/* Top gradient rule */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
      />

      <div className="relative mx-auto max-w-2xl">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-mono text-sm font-semibold uppercase tracking-widest text-cyan-400">
            // contact
          </span>
          <h2
            id="contact-heading"
            className="text-3xl font-bold tracking-tight text-white md:text-4xl"
          >
            Get in touch
          </h2>
          <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
            Have a project in mind, a question, or just want to say hi?
            Fill out the form and I&apos;ll get back to you.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8 backdrop-blur-sm">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
