import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
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
  {
    name: "image",
    maxCount: 4,
  },
  {
    name: "avatar",
    maxCount: 1,
  },
  {
    name: "cover",
    maxCount: 1,
  },
]);

const uploadMidlleware = () => {
  //   console.log(fieldname);

  return (req: Request, res: Response, next: NextFunction) => {
    // console.log("before", req.files);

    upload(req, res, (err) => {
      //   console.log("after", err);

      if (err instanceof multer.MulterError) {
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

      return next();
    });
  };
};

export default uploadMidlleware;
