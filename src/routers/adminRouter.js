const express = require("express")
const router = express.Router()
/* const methodOverrise */
const adminController = require("../controllers/admin/adminController")
const adminProductController = require("../controllers/admin/adminProductController")
const adminCategoryController = require("../controllers/admin/adminCategoryController");
const uploadFile = require("../middlewares/uploadProductImg")
const validateAddProduct = require("../validations/adminAddProduct")
const validateEditProduct = require("../validations/adminEditProduct")
const userSession = require("../middlewares/userSession")
const adminCheck = require("../middlewares/admincheck")

// Get - index
router.get("/", userSession, adminCheck, adminController.index)

router.get("/search", userSession, adminCheck, adminController.search)

/* router.get("/producto/:id", adminController.product) */

/* CRUD  PRODUCTS*/

    // Get - Lista productos
router.get("/products", userSession, adminCheck, adminProductController.list)
    // Get - Agregar producto (Pero no los crea)
router.get("/products/create", userSession, adminCheck, adminProductController.productAdd)
    // Post - Crear un producto en DB
router.post("/products", uploadFile.single("image"), validateAddProduct ,adminProductController.productCreate)
    // Get - Editar producto
router.get("/products/edit/:id", userSession, adminCheck,validateEditProduct, adminProductController.productEdit)
    //Put - actualizar producto
router.put("/products/:id", uploadFile.single("image"), validateAddProduct, adminProductController.productUpdate)
    //Delete - Eliminar producto
router.delete("/products/eliminar/:id", adminProductController.productDelete)

/* router.get("/products/search", adminProductController.search) */


/* CRUD CATEGORIA */

router.get('/categories', userSession, adminCheck, adminCategoryController.list );

router.get('/categories/addCategory', userSession, adminCheck,  adminCategoryController.categoryAdd );

router.post('/categories', adminCategoryController.categoryCreate );

router.get('/categories/editCategory/:id', userSession, adminCheck, adminCategoryController.categoryEdit );

router.get('/categories/searchCategory', adminCategoryController.categorySearch)

router.put('/categories/editCategory/:id', adminCategoryController.categoryUpdate );

router.delete('/categories/delete/:id', adminCategoryController.categoryDelete);


/* Sin permiso Mati y Jona*/

router.get("/sinPermiso", adminController.sinPermiso)

module.exports = router;