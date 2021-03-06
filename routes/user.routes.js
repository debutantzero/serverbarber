const router = require("express").Router();
const userController = require("../controllers/user.controllers");
const postController = require("../controllers/post.controllers");
const multer = require("multer");
const upload = multer();
router.get("/all" , userController.valid);
router.get('/alluser', userController.getAll);
router.get("/logout", userController.logout);
router.get("/:id", userController.getUserData);
router.get("/update/:id", userController.getUserUpdateData);
router.get("/", userController.online);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.patch("/profil", upload.single("file"), postController.profilImage);
router.patch("/update/entreprise", userController.updateEntreprise);
router.patch("/update/username", userController.updateUsername);
router.patch("/update/pays", userController.updatePays);
router.patch("/update/ville", userController.updateVille);
router.patch("/update/address", userController.updateAdress);




module.exports = router;