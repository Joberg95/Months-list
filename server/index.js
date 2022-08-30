import express from "express";
import cors from "cors";
import Chance from "chance";

const app = express();
app.use(cors());
app.use(express.json());

const chance = new Chance();

const months = [...Array(150).keys()].map((id) => {
  return {
    id,
    type: chance.month(),
  };
});

app.get("", (req, res) => {
  //filters results when queried
  const q = req.query.q?.toLowerCase() || "";
  const results = months.filter((month) =>
    month.type.toLowerCase().includes(q)
  );

  res.send(results);
});

app.listen(8080, () => console.log('Listening on port http://localhost:8080'));
