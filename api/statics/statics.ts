import { Request, Response } from "express";

const getAll = async (req: Request, res: Response, model: any): Promise<void> => {
  try {
    const registers = await model.find();
    res.json(registers);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const getById = async (req: Request, res: Response, model: any): Promise<void> => {
  try {
    const register = await model.findById(req.params.id);
    if (!register) {
      res.status(404).json({
        message: "Register not found",
      });
    } else
      res.json(register);
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
};

const getByParam = async (req: Request, res: Response, model: any): Promise<void> => {
  try {
    const register = await model.findOne({ [req.params.param]: req.params.value });
    if (!register) {
      res.status(404).json({
        message: "Register not found",
      });
    } else
      res.json(register);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const create = async (req: Request, res: Response, model: any): Promise<void> => {
  try {
    const register = new model(req.body);
    await register.save();
    res.json({
      message: "Register created successfully",
      register
    });
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
}

const update = async (req: Request, res: Response, model: any): Promise<void> => {
  try {
    const register = await model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    });
    res.json({
      message: "Register updated successfully",
      register
    });
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
}

const deleteById = async (req: Request, res: Response, model: any): Promise<void> => {
  try {
    await model.findByIdAndDelete(req.params.id);
    res.json({
      message: "Register deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
}

export { getAll, getById, getByParam, create, update, deleteById };