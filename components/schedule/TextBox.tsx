interface Props {
  img?: string;
  text: string;
  title: string;
  html: boolean;
}
const TextBox = ({ img, text, title, html }: Props) => {
  return (
    <div className="relative overflow-hidden perspective-1000">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
      <h2
        className="text-4xl font-extrabold mb-6"
        style={{
          backgroundImage: `url(${img || "/default-poster.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        {title}
      </h2>

      {html ? (
        <div
          className="text-neutral-600 dark:text-neutral-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ) : (
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {text}
        </p>
      )}
    </div>
  );
};

export default TextBox;
