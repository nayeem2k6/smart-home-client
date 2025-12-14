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

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// export default function AdminServices() {
//   const axiousSecure = useAxiosSecure();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingService, setEditingService] = useState(null);
//   const [formData, setFormData] = useState({
//     service_name: "",
//     cost: "",
//     unit: "",
//     category: "",
//     description: "",
//     image: "",
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState("");

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

//   const openModal = (service = null) => {
//     if (service) {
//       setEditingService(service);
//       setFormData({
//         service_name: service.service_name || "",
//         cost: service.cost || "",
//         unit: service.unit || "",
//         category: service.category || "",
//         description: service.description || "",
//         image: service.image || "",
//       });
//       setPreview(service.image || "");
//     } else {
//       setEditingService(null);
//       setFormData({
//         service_name: "",
//         cost: "",
//         unit: "",
//         category: "",
//         description: "",
//         image: "",
//       });
//       setPreview("");
//     }
//     setModalOpen(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await axios.delete(`http://localhost:3000/admin/services/${id}`);
//       toast.success("Service deleted successfully");
//       refetch();
//     } catch (err) {
//       toast.error("Delete failed");
//       console.error(err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let imageUrl = formData.image;

//       if (imageFile) {
//         const formDataImg = new FormData();
//         formDataImg.append("image", imageFile);

//         const { data: imgData } = await axios.post(
//           `https://api.imgbb.com/1/upload?key=${
//             import.meta.env.VITE_IMGBB_API_KEY
//           }`,
//           formDataImg
//         );
//         imageUrl = imgData.data.url;
//       }

//       const payload = { ...formData, image: imageUrl };
        
//       if (editingService) {
//         // Update
//         await axios.put(
//           `http://localhost:3000/admin/services/${editingService._id}`,
//           payload
//         );
//         toast.success("Service updated successfully");
//       } else {
//         // Create
//         await axiousSecure.post("/admin/services", payload);
//         toast.success("Service added successfully");
//       }

//       setModalOpen(false);
//       setEditingService(null);
//       setFormData({
//         service_name: "",
//         cost: "",
//         unit: "",
//         category: "",
//         description: "",
//         image: "",
//       });
//       setPreview("");
//       setImageFile(null);
//       refetch();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to save service");
//     }
//   };

//   if (isLoading) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Decoration Services</h1>

//       <button
//         onClick={() => openModal()}
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
//             {service.image && (
//               <img
//                 src={service.image}
//                 alt={service.service_name}
//                 className="w-full h-40 object-cover rounded-xl"
//               />
//             )}
//             <h2 className="font-semibold text-lg">{service.service_name}</h2>
//             {service.category && (
//               <p className="text-sm">Category: {service.category}</p>
//             )}
//             <p className="text-sm">
//               <span className="font-medium">Price:</span> ৳{service.cost}{" "}
//               {service.unit && `/ ${service.unit}`}
//             </p>
//             {service.duration && (
//               <p className="text-sm">
//                 <span className="font-medium">Duration:</span>{" "}
//                 {service.duration}
//               </p>
//             )}
//             {service.description && (
//               <p className="text-sm text-gray-600">{service.description}</p>
//             )}

//             <div className="flex gap-2 mt-3">
//               <button
//                 onClick={() => openModal(service)}
//                 className="px-3 py-1 bg-blue-600 text-white rounded-lg"
//               >
//                 Edit
//               </button>
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

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white p-6 rounded-2xl w-96"
//           >
//             <h2 className="text-xl font-semibold mb-4">
//               {editingService ? "Edit Service" : "Add Service"}
//             </h2>

//             <input
//               name="service_name"
//               value={formData.service_name}
//               onChange={handleChange}
//               placeholder="Service Name"
//               className="w-full border p-2 mb-2 rounded"
//               required
//             />

//             <input
//               name="cost"
//               type="number"
//               value={formData.cost}
//               onChange={handleChange}
//               placeholder="Cost (BDT)"
//               className="w-full border p-2 mb-2 rounded"
//               required
//             />

//             <input
//               name="unit"
//               value={formData.unit}
//               onChange={handleChange}
//               placeholder="Unit"
//               className="w-full border p-2 mb-2 rounded"
//               required
//             />

//             <input
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               placeholder="Category"
//               className="w-full border p-2 mb-2 rounded"
//               required
//             />

//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Description"
//               className="w-full border p-2 mb-2 rounded"
//               required
//             />

//             {/* IMAGE INPUT */}
//             <input
//               type="file"
//               accept="image/*"
//               className="w-full mb-2"
//               onChange={(e) => {
//                 setImageFile(e.target.files[0]);
//                 setPreview(URL.createObjectURL(e.target.files[0]));
//               }}
//             />

//             {preview && (
//               <img
//                 src={preview}
//                 alt="preview"
//                 className="w-full h-40 object-cover rounded-xl mb-2"
//               />
//             )}

//             <div className="flex justify-between mt-4">
//               <button className="px-4 py-2 bg-black text-white rounded-xl">
//                 Save
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setModalOpen(false)}
//                 className="px-4 py-2 border rounded-xl"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }




import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { 
  FaEdit, 
  FaTrash, 
  FaImage, 
  FaTag, 
  FaDollarSign, 
  FaLayerGroup, 
  FaInfoCircle,
  FaPlus,
  FaTimes
} from "react-icons/fa";

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
  const [isUploading, setIsUploading] = useState(false);

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
      setImageFile(null);
    }
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;
    
    try {
      setIsUploading(true);
      const formDataImg = new FormData();
      formDataImg.append("image", file);

      const { data: imgData } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formDataImg
      );
      
      setIsUploading(false);
      return imgData.data.url;
    } catch (error) {
      setIsUploading(false);
      console.error("Image upload error:", error);
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
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
    
    // Validation
    if (!formData.service_name.trim()) {
      toast.error("Service name is required");
      return;
    }
    
    if (!formData.cost || parseFloat(formData.cost) <= 0) {
      toast.error("Valid cost is required");
      return;
    }

    try {
      let imageUrl = formData.image;

      // Upload new image if selected
      if (imageFile) {
        const uploadedUrl = await handleImageUpload(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          toast.error("Image upload failed. Please try again.");
          return;
        }
      }

      const payload = { 
        ...formData, 
        image: imageUrl,
        title: formData.service_name,
        cost: parseFloat(formData.cost)
      };

      if (editingService) {
        // Update service
        await axios.put(
          `http://localhost:3000/admin/services/${editingService._id}`,
          payload
        );
        toast.success("Service updated successfully");
      } else {
        // Create new service
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
      console.error("Save error:", err);
      toast.error(err.response?.data?.message || "Failed to save service");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Decoration Services
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your decoration services and packages
            </p>
          </div>
          
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaPlus />
            <span>Add New Service</span>
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.service_name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <FaImage className="text-gray-400 text-4xl" />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ৳{service.cost}
                  {service.unit && <span> / {service.unit}</span>}
                </div>
              </div>

              {/* Service Details */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800 truncate">
                    {service.service_name}
                  </h3>
                </div>

                <div className="space-y-3 mb-4">
                  {service.category && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaTag className="text-blue-500" />
                      <span className="font-medium">Category:</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {service.category}
                      </span>
                    </div>
                  )}

                  {service.description && (
                    <div className="flex items-start gap-2 text-gray-600">
                      <FaInfoCircle className="text-green-500 mt-1" />
                      <p className="text-sm line-clamp-2">{service.description}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openModal(service)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {services.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                <FaLayerGroup className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No Services Found
              </h3>
              <p className="text-gray-500 mb-6">
                Get started by adding your first decoration service
              </p>
              <button
                onClick={() => openModal()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 inline-flex items-center gap-2"
              >
                <FaPlus />
                Add Your First Service
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingService ? "Edit Service" : "Add New Service"}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {editingService ? "Update service details" : "Fill in the service details"}
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaTimes className="text-xl text-gray-500" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Name *
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaLayerGroup />
                        </div>
                        <input
                          name="service_name"
                          value={formData.service_name}
                          onChange={handleChange}
                          placeholder="e.g., Wedding Decoration"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cost (BDT) *
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaDollarSign />
                        </div>
                        <input
                          name="cost"
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.cost}
                          onChange={handleChange}
                          placeholder="0.00"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit *
                      </label>
                      <input
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        placeholder="e.g., per event, per hour"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="e.g., Wedding, Birthday, Corporate"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                   
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your service in detail..."
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Image
                      </label>
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:border-blue-500 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="image-upload"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setImageFile(file);
                                setPreview(URL.createObjectURL(file));
                              }
                            }}
                          />
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer flex flex-col items-center justify-center"
                          >
                            <FaImage className="text-3xl text-gray-400 mb-2" />
                            <span className="text-gray-600">
                              Click to upload image
                            </span>
                            <span className="text-sm text-gray-400">
                              PNG, JPG, WEBP up to 5MB
                            </span>
                          </label>
                        </div>

                        {isUploading && (
                          <div className="text-center">
                            <div className="inline-flex items-center gap-2 text-blue-600">
                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-600"></div>
                              Uploading image...
                            </div>
                          </div>
                        )}

                        {preview && (
                          <div className="relative">
                            <img
                              src={preview}
                              alt="preview"
                              className="w-full h-48 object-cover rounded-xl"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setPreview("");
                                setImageFile(null);
                                setFormData(prev => ({...prev, image: ""}));
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        Saving...
                      </span>
                    ) : editingService ? (
                      "Update Service"
                    ) : (
                      "Add Service"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}