import { Input } from "../ui/input";

export function NumberInput() {
  return (
    <Input 
      type="number"
      min="0"
      placeholder="Informe a quantidade"
    />
  )
}