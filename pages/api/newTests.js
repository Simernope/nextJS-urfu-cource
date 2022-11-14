import {newTests} from "../../data/newTests";

export default function handler(req, res) {
    res.status(200).json({newTests})
}
