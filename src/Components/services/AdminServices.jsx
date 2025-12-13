// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useState } from "react";
// import { NavLink } from "react-router";
// import { toast } from "react-toastify";

// export default function AdminServices() {
//   const [selectedService, setSelectedService] = useState(null);

//   const {
//     data: services = [],
//     refetch,
//     isLoading,
//   } = useQuery({
//     queryKey: ["admin-services"],
//     queryFn: async () => {
//       const res = await axios.get("http://localhost:3000/admin/services");
//       return res.data;
//     },
//   });

//   const handleDelete = async (id) => {
//     toast.success("Are you sure?")
//     await axios.delete(`http://localhost:3000/admin/services/${id}`);
//     refetch();
//   };

//   if (isLoading) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Decoration Services</h1>

//       <button
//         onClick={() => setSelectedService({})}
//         className="mb-4 px-4 py-2 bg-black text-white rounded-xl"
//       >
//         + Add Service
//       </button>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {services.map((service) => (
//           <div
//             key={service._id}
//             className="border rounded-2xl p-4 shadow space-y-2"
//           >
//             {/* Service Image */}
//             {service.image && (
//               <img
//                 src={service.image}
//                 alt={service.title || service.service_name}
//                 className="w-full h-40 object-cover rounded-xl"
//               />
//             )}

//             {/* Title */}
//             <h2 className="font-semibold text-lg">
//               {service.title || service.service_name}
//             </h2>

//             {/* Category */}
//             {service.category && (
//               <p className="text-sm">Category: {service.category}</p>
//             )}

//             {/* Price & Duration */}
//             <p className="text-sm">
//               <span className="font-medium">Price:</span> ৳
//               {service.price || service.cost}{" "}
//               {service.unit && `/ ${service.unit}`}
//             </p>

//             {service.duration && (
//               <p className="text-sm">
//                 <span className="font-medium">Duration:</span>{" "}
//                 {service.duration}
//               </p>
//             )}

//             {/* Description */}
//             {service.description && (
//               <p className="text-sm text-gray-600">{service.description}</p>
//             )}

//             {/* Action Buttons */}
//             <div className="flex gap-2 mt-3">
//               <NavLink to={'/dashboard/services'}
//                 onClick={() => setSelectedService(service)}
//                 className="px-3 py-1 bg-blue-600 text-white rounded-lg"
//               >
//                 Edit
//               </NavLink>
//               <button
//                 onClick={() => handleDelete(service._id)}
//                 className="px-3 py-1 bg-red-600 text-white rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedService && (
//         <ServiceForm
//           service={selectedService}
//           close={() => setSelectedService(null)}
//           refetch={refetch}
//         />
//       )}
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import axios from "axios";

//  export default function ServiceForm({ service = {}, close, refetch }) {
//   const isEdit = !!service._id;
//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState(service?.image || "");

//   // Controlled form state to avoid undefined errors
//   const [formData, setFormData] = useState({
//     service_name: service?.service_name || "",
//     cost: service?.cost || "",
//     unit: service?.unit || "",
//     category: service?.category || "",
//     description: service?.description || "",
//   });

//   useEffect(() => {
//     // Update formData if service changes (Edit)
//     setFormData({
//       service_name: service?.service_name || "",
//       cost: service?.cost || "",
//       unit: service?.unit || "",
//       category: service?.category || "",
//       description: service?.description || "",
//     });
//     setPreview(service?.image || "");
//   }, [service]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let imageUrl = service?.image || "";

//       if (imageFile) {
//         const formDataImg = new FormData();
//         formDataImg.append("image", imageFile);

//         const { data: imgData } = await axios.post(
//           `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
//           formDataImg
//         );

//         imageUrl = imgData.data.url;
//       }

//       const payload = {
//         ...formData,
//         image: imageUrl,
//       };

//       if (isEdit) {
//         await axios.put(`http://localhost:3000/admin/services/${service._id}`, payload);
//       } else {
//         await axios.post("http://localhost:3000/admin/services", payload);
//       }

//       refetch();
//       close();
//     } catch (err) {
//       console.error("Service save error:", err);
//       alert("Something went wrong. Check console.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl w-96">
//         <h2 className="text-xl font-semibold mb-4">
//           {isEdit ? "Edit Service" : "Add Service"}
//         </h2>

//         <input
//           name="service_name"
//           value={formData.service_name}
//           onChange={handleChange}
//           placeholder="Service Name"
//           className="w-full border p-2 mb-2 rounded"
//           required
//         />

//         <input
//           name="cost"
//           type="number"
//           value={formData.cost}
//           onChange={handleChange}
//           placeholder="Cost (BDT)"
//           className="w-full border p-2 mb-2 rounded"
//           required
//         />

//         <input
//           name="unit"
//           value={formData.unit}
//           onChange={handleChange}
//           placeholder="Unit"
//           className="w-full border p-2 mb-2 rounded"
//           required
//         />

//         <input
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           placeholder="Category"
//           className="w-full border p-2 mb-2 rounded"
//           required
//         />

//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Description"
//           className="w-full border p-2 mb-2 rounded"
//           required
//         />

//         {/* IMAGE INPUT */}
//         <input
//           type="file"
//           accept="image/*"
//           className="w-full mb-2"
//           onChange={(e) => {
//             setImageFile(e.target.files[0]);
//             setPreview(URL.createObjectURL(e.target.files[0]));
//           }}
//         />

//         {preview && (
//           <img
//             src={preview}
//             alt="preview"
//             className="w-full h-40 object-cover rounded-xl mb-2"
//           />
//         )}

//         <div className="flex justify-between mt-4">
//           <button className="px-4 py-2 bg-black text-white rounded-xl">Save</button>
//           <button
//             type="button"
//             onClick={close}
//             className="px-4 py-2 border rounded-xl"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AdminServices() {
  const axiousSecure = useAxiosSecure();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    service_name: "",
    cost: "",
    unit: "",
    category: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const {
    data: services = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/admin/services");
      return res.data;
    },
  });

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        service_name: service.service_name || "",
        cost: service.cost || "",
        unit: service.unit || "",
        category: service.category || "",
        description: service.description || "",
        image: service.image || "",
      });
      setPreview(service.image || "");
    } else {
      setEditingService(null);
      setFormData({
        service_name: "",
        cost: "",
        unit: "",
        category: "",
        description: "",
        image: "",
      });
      setPreview("");
    }
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:3000/admin/services/${id}`);
      toast.success("Service deleted successfully");
      refetch();
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const formDataImg = new FormData();
        formDataImg.append("image", imageFile);

        const { data: imgData } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formDataImg
        );
        imageUrl = imgData.data.url;
      }

      const payload = { ...formData, image: imageUrl };
        
      if (editingService) {
        // Update
        await axios.put(
          `http://localhost:3000/admin/services/${editingService._id}`,
          payload
        );
        toast.success("Service updated successfully");
      } else {
        // Create
        await axiousSecure.post("/admin/services", payload);
        toast.success("Service added successfully");
      }

      setModalOpen(false);
      setEditingService(null);
      setFormData({
        service_name: "",
        cost: "",
        unit: "",
        category: "",
        description: "",
        image: "",
      });
      setPreview("");
      setImageFile(null);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save service");
    }
  };

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Decoration Services</h1>

      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-black text-white rounded-xl"
      >
        + Add Service
      </button>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service._id}
            className="border rounded-2xl p-4 shadow space-y-2"
          >
            {service.image && (
              <img
                src={service.image}
                alt={service.service_name}
                className="w-full h-40 object-cover rounded-xl"
              />
            )}
            <h2 className="font-semibold text-lg">{service.service_name}</h2>
            {service.category && (
              <p className="text-sm">Category: {service.category}</p>
            )}
            <p className="text-sm">
              <span className="font-medium">Price:</span> ৳{service.cost}{" "}
              {service.unit && `/ ${service.unit}`}
            </p>
            {service.duration && (
              <p className="text-sm">
                <span className="font-medium">Duration:</span>{" "}
                {service.duration}
              </p>
            )}
            {service.description && (
              <p className="text-sm text-gray-600">{service.description}</p>
            )}

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => openModal(service)}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service._id)}
                className="px-3 py-1 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl w-96"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingService ? "Edit Service" : "Add Service"}
            </h2>

            <input
              name="service_name"
              value={formData.service_name}
              onChange={handleChange}
              placeholder="Service Name"
              className="w-full border p-2 mb-2 rounded"
              required
            />

            <input
              name="cost"
              type="number"
              value={formData.cost}
              onChange={handleChange}
              placeholder="Cost (BDT)"
              className="w-full border p-2 mb-2 rounded"
              required
            />

            <input
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="Unit"
              className="w-full border p-2 mb-2 rounded"
              required
            />

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full border p-2 mb-2 rounded"
              required
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border p-2 mb-2 rounded"
              required
            />

            {/* IMAGE INPUT */}
            <input
              type="file"
              accept="image/*"
              className="w-full mb-2"
              onChange={(e) => {
                setImageFile(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-full h-40 object-cover rounded-xl mb-2"
              />
            )}

            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 bg-black text-white rounded-xl">
                Save
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
