import Product from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { title,product_id, description, thumbnail, price,distance ,catagory } = req.body;
    const product = await Product.create({
      title,
      price,
      description, thumbnail,distance ,catagory,product_id,
    });
    if (product) {
      generateToken(res, product._id);
      res.status(201).json({
        product_id: product._id,
        email: product.email,
        name: product.name,
        photo: product.photo,
      });
    } else {
      res.status(400).json({ message: "User not added" });
    }

    res.status(201).json(product); // Oluşturulan ürünü JSON formatında yanıtla
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Tüm ürünleri getiren fonksiyon
const getAllProducts = async (req, res) => {
  try {
    // Tüm ürünleri veritabanından çek
    const products = await Product.find();
    res.status(200).json(products); // Ürünleri JSON formatında yanıtla
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Belirli bir ürünü ID ile getiren fonksiyon
const getProductById = async (req, res) => {
  const { id } = req.params; // İstekten ürün ID'sini al

  try {
    // Veritabanından belirli bir ürünü ID ile sorgula
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }

    res.status(200).json(product); // Ürünü JSON formatında yanıtla
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Belirli bir ürünü güncelleyen fonksiyon
const updateProduct = async (req, res) => {
  const { id } = req.params; // İstekten ürün ID'sini al
  const { title, price } = req.body; // İstekten güncellenecek verileri al

  try {
    // Veritabanında belirli bir ürünü ID ile bul ve güncelle
    const updatedProduct = await Product.findByIdAndUpdate(id, { title, price }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Güncellenecek ürün bulunamadı' });
    }

    res.status(200).json(updatedProduct); // Güncellenen ürünü JSON formatında yanıtla
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Belirli bir ürünü silen fonksiyon
const deleteProduct = async (req, res) => {
  const { id } = req.params; // İstekten ürün ID'sini al

  try {
    // Veritabanında belirli bir ürünü ID ile bul ve sil
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Silinecek ürün bulunamadı' });
    }

    res.status(200).json({ message: 'Ürün başarıyla silindi' }); // Başarılı mesajı JSON formatında yanıtla
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
