export default function MapEmbed() {
  return (
    <div className="w-full h-full min-h-100 rounded-xl overflow-hidden border border-red-900/20">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.948407452274!2d-74.0758814!3d4.6032619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99a095d0d8ad%3A0x678ed465c465e46b!2zQ3JhLiAxMCAjMjEtMDYsIFNhbnRhIEbDqSwgQm9nb3TDoQ!5e0!3m2!1ses!2sco!4v1775834815280!5m2!1ses!2sco"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
      />
    </div>
  );
}