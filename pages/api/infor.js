import { machineId, machineIdSync } from "node-machine-id";

async function getMachineId() {
  let id = await machineId();
}

export default async (req, res) => {
  let id = machineIdSync();
  res.json(id);
};
