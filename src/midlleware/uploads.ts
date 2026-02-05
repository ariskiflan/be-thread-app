// import { NextFunction, Request, Response } from "express";
// import multer from "multer";
// import path from "path";
// import { v2 as cloudinary } from "cloudinary";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../uploads"));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + file.originalname.replace(/\s/g, "")
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 3,
//   },
// }).fields([
//   {
//     name: "image",
//     maxCount: 4,
//   },
//   {
//     name: "avatar",
//     maxCount: 1,
//   },
//   {
//     name: "cover",
//     maxCount: 1,
//   },
// ]);


// const multerMidlleware = () => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     upload(req, res, async (err) => {
//       console.log("=== MASUK MULTER ===");

//       if (err instanceof multer.MulterError) {
//         console.log("MULTER ERROR:", err);
//         if (err.code === "LIMIT_FILE_SIZE") {
//           return res.status(400).json({
//             status: false,
//             message: "File too large",
//           });
//         }
//         return res.status(500).json({
//           status: false,
//           message: err.message,
//         });
//       }

       

//       console.log("REQ FILES KEYS:", Object.keys(req.files || {}));
// console.log("REQ BODY:", req.body);


//       if (req.files) {
//         try {
//           const files = req.files as {
//             [fieldname: string]: Express.Multer.File[];
//           };

//           const { image, avatar, cover } = files;
//           if (image && image.length > 0) {
//             const imagesUrls = await Promise.all(
//               image.map(async (img) => {
//                 console.log("UPLOAD FILE PATH:", img.path);

//                 try {
//                   const imageUrl = await cloudinary.uploader.upload(img.path);
//                   console.log("UPLOAD RESULT:", imageUrl);

//                   return { image: imageUrl.secure_url };
//                 } catch (error) {
//                   console.log("CLOUDINARY ERROR:", error);
//                 }
//               })
//             );

//             req.body.image = imagesUrls;
//             console.log("REQ.BODY setelah upload:", req.body);
//           }

//           if (avatar && avatar.length > 0) {
//             const avatarUrl = await cloudinary.uploader.upload(avatar[0].path);
//             req.body.avatar = avatarUrl.secure_url;
//           }

//           if (cover && cover.length > 0) {
//             const coverUrl = await cloudinary.uploader.upload(cover[0].path);
//             req.body.cover = coverUrl.secure_url;
//           }
//         } catch (error) {
//           console.log("PROCESS ERROR:", error);
//         }
//       }

//       return next();
//     });
//   };
// };


// export default multerMidlleware;


import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// pastikan folder uploads ada di root project
const uploadDir = path.join(process.cwd(), "src", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // selalu ke projectRoot/src/uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + file.originalname.replace(/\s/g, "")
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
}).fields([
  { name: "image", maxCount: 4 },
  { name: "avatar", maxCount: 1 },
  { name: "cover", maxCount: 1 },
]);

const multerMidlleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, async (err) => {
      console.log("=== MASUK MULTER ===");

      if (err instanceof multer.MulterError) {
        console.log("MULTER ERROR:", err);
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            status: false,
            message: "File too large",
          });
        }
        return res.status(500).json({
          status: false,
          message: err.message,
        });
      }

      console.log("REQ FILES KEYS:", Object.keys(req.files || {}));
      console.log("REQ BODY:", req.body);

      if (req.files) {
        try {
          const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
          };

          const { image, avatar, cover } = files;
          if (image && image.length > 0) {
            const imagesUrls = await Promise.all(
              image.map(async (img) => {
                console.log("UPLOAD FILE PATH:", img.path);

                try {
                  const imageUrl = await cloudinary.uploader.upload(img.path);
                  console.log("UPLOAD RESULT:", imageUrl);

                  return { image: imageUrl.secure_url };
                } catch (error) {
                  console.log("CLOUDINARY ERROR:", error);
                }
              })
            );

            req.body.image = imagesUrls;
            console.log("REQ.BODY setelah upload:", req.body);
          }

          if (avatar && avatar.length > 0) {
            const avatarUrl = await cloudinary.uploader.upload(avatar[0].path);
            req.body.avatar = avatarUrl.secure_url;
          }

          if (cover && cover.length > 0) {
            const coverUrl = await cloudinary.uploader.upload(cover[0].path);
            req.body.cover = coverUrl.secure_url;
          }
        } catch (error) {
          console.log("PROCESS ERROR:", error);
        }
      }

      return next();
    });
  };
};

export default multerMidlleware;

