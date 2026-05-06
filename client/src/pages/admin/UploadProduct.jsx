// client/src/pages/admin/UploadProduct.jsx
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import NewProductInput from "../../components/adminComponents/NewProductInput";
import Spinner from "../../components/Spinner";

const UploadProduct = () => {
  // ➡️ imageFile guarda el File, preview guarda la URL temporal
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [barcode, setBarcode] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file)); // vista previa
  };

  const handleSubmit = async () => {
    if (!name.trim() || !brand.trim() || !category.trim()) {
      return toast.error("Campos obligatorios incompletos");
    }
    if (!imageFile) {
      return toast.error("Debes subir una imagen");
    }

    setLoading(true);

    // ➡️ Creamos FormData para multipart/form-data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("image", imageFile);
    // Solo incluir barcode si tiene valor
    if (barcode.trim() !== "") {
      formData.append("barcode", barcode.trim());
    }
    if (suggestedPrice.trim() !== 0) {
      formData.append("suggestedPrice", suggestedPrice);
    }

    try {
      // La consola me señala que el error está en esta linea (42)
      const { data } = await axios.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log("Producto subido:", data.product);
      toast.success("Producto subido");
      setPreview("");
      setName("");
      setBrand("");
      setBarcode("");
      setCategory("");
      setSuggestedPrice(0);
      setLoading(false);
      // limpiar form...
    } catch (err) {
      console.error(err);
      toast.error("Error al subir el producto");
    }
  };

  return (
    <>
      {loading && (
        <>
          <div className="flex fixed inset-0 items-center justify-center bg-neutral-700/30">
            <Spinner />
          </div>
        </>
      )}
      <section className="flex flex-col w-full h-fit lg:h-full pt-5 lg:gap-0 sm:px-10">
        <div className="flex flex-col sm:flex-row w-full h-fit my-auto gap-10 sm:gap-0 px-4">
          {/* Text inputs */}
          <div className="flex flex-col h-full w-fit sm:w-1/2 gap-4 mx-auto">
            <h1 className="text-neutral-400 text-4xl font-medium w-full text-center sm:text-end mb-5">
              Información del producto
            </h1>

            <NewProductInput label="Nombre" value={name} onChange={setName} />

            <NewProductInput label="Marca" value={brand} onChange={setBrand} />

            <NewProductInput
              label="Precio"
              value={suggestedPrice}
              onChange={setSuggestedPrice}
              type="number"
            />
            <NewProductInput
              label="Barcode"
              value={barcode}
              onChange={setBarcode}
            />
            <NewProductInput
              label="Categoria"
              value={category}
              onChange={setCategory}
            />
          </div>

          {/* Image inputs */}
          <div className="flex flex-col h-full w-full sm:w-1/2 items-center overflow-hidden justify-center gap-4 px-4">
            {preview && (
              <img
                src={preview}
                alt="Preview del producto"
                className="w-full max-w-80 aspect-square object-cover bg-neutral-800 rounded-lg border border-neutral-500"
              />
            )}

            {!preview && (
              <div className="w-full max-w-80 aspect-square object-cover bg-neutral-800 rounded-lg border border-neutral-500" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="flex w-full max-w-80 bg-neutral-700 p-2 rounded text-neutral-200 cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="py-2 text-center w-9/10 self-center sm:w-80 bg-main text-neutral-100 font-bold rounded my-10 cursor-pointer"
        >
          Subir producto
        </button>
      </section>
    </>
  );
};

export default UploadProduct;
