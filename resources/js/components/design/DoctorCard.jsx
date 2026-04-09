export default function DoctorCard({ doctor }) {
  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden shadow-md border border-gray-100 bg-white">
      {/* Image Section */}
      <div className="relative h-[220px] overflow-hidden bg-gray-100">
        <img
          src={doctor.img}
          alt={`${doctor.name} – ${doctor.specialty}`}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute bottom-3 left-3 bg-[rgba(10,77,140,0.9)] backdrop-blur-sm rounded-md px-2.5 py-1 text-white text-xs font-semibold">
          {doctor.experience}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 px-6 pt-5 pb-6">
        <span className="inline-block self-start bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
          {doctor.specialty}
        </span>
        <h3 className="text-[1.05rem] font-semibold text-gray-800 mb-1">
          {doctor.name}
        </h3>
        <p className="text-[0.82rem] text-gray-500 mb-0.5">{doctor.qual}</p>
        <p className="text-[0.82rem] text-gray-500 mb-4">
          Available: {doctor.available}
        </p>
        <a
          href="/appointment"
          className="mt-auto inline-block text-center bg-blue-800 hover:bg-blue-800 text-white text-[0.85rem] font-medium px-[18px] py-[9px] rounded-lg transition-colors duration-200"
        >
          Book Appointment
        </a>
      </div>
    </div>
  );
}