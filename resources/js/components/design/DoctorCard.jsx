// components/design/DoctorCard.jsx

export default function DoctorCard({ doctor }) {
  const renderStars = (rating) => {
    const full = Math.round(parseFloat(rating));
    return (
      <span className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-3.5 h-3.5 ${i < full ? "text-amber-400" : "text-gray-200"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
          </svg>
        ))}
      </span>
    );
  };

  return (
    <article className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 hover:-translate-y-1">

      {/* Image */}
      <div className="relative h-[210px] overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100">
        <img
          src={doctor.img}
          alt={`${doctor.name} – ${doctor.specialty}`}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Experience badge */}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-blue-900/80 backdrop-blur-sm text-blue-100 text-[11px] font-semibold px-2.5 py-1 rounded-md">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          {doctor.experience}
        </span>

        {/* Availability dot */}
        <span className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-emerald-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5">

        {/* Specialty */}
        <span className="self-start inline-block bg-blue-50 text-blue-700 text-[11px] font-semibold px-3 py-1 rounded-full mb-3 tracking-wide uppercase">
          {doctor.specialty}
        </span>

        {/* Name */}
        <h3 className="text-[15px] font-semibold text-gray-900 mb-0.5 leading-snug">
          {doctor.name}
        </h3>

        {/* Qualification */}
        <p className="text-[12px] text-gray-400 mb-3 leading-relaxed">
          {doctor.qual}
        </p>

        {/* Rating */}
        {/* <div className="flex items-center gap-2 mb-3">
          {renderStars(doctor.rating)}
          <span className="text-[12px] font-semibold text-gray-700">{doctor.rating}</span>
          <span className="text-[12px] text-gray-400">({doctor.reviews} reviews)</span>
        </div> */}

        {/* Availability schedule */}
        <div className="flex items-start gap-2 mb-5">
          <svg className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[12px] text-gray-500 leading-relaxed">{doctor.available}</span>
        </div>

        {/* CTA */}
        <a
          href="/appointment"
          className="mt-auto group/btn relative overflow-hidden flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-800 active:scale-90 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Book Appointment
        </a>
      </div>
    </article>
  );
}
