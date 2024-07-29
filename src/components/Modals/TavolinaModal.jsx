import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import axios from "axios";
import { REGISTER_NEW_TABLE } from "../../endpoints/Tables/Tables";

export default function TavolinaModal({
  setModalOpen,
  modalOpen,
  setTableOutput,
}) {
  const [tavNr, setTavNr] = React.useState(0);

  const [tableErrorMessage, setTableErrorMessage] = React.useState("");
  const insertTable = async (tavNr) => {
    try {
      const res = await axios.post(REGISTER_NEW_TABLE, null, {
        params: { tableNumber: tavNr },
        withCredentials: true,
      });

      console.log("res=", res);
      if (res.data.data == "Success") {
        setTableOutput("Success");
        setModalOpen(false);
        setTableErrorMessage("");
      } else if (res.data.data == "Exists") {
        setModalOpen(true);
        setTableOutput("Exists");
        setTableErrorMessage(
          "Tavolina me numer: #" + tavNr + " ekziston. Provoni me numer tjeter."
        );
      } else if (res.data.data == "Failure") {
        setTableOutput("Failure");
        setModalOpen(true);
        setTableErrorMessage(
          "Probleme me serverin. Provoni me voni ose kontaktoni Adminin!"
        );
      }
    } catch (error) {
      console.error("Error=", error);
    }
  };
  return (
    <React.Fragment>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalDialog>
          <DialogTitle>Regjistroni tavoline te re</DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Numri i tavolines</FormLabel>
                <Input
                  autoFocus
                  required
                  type="number"
                  onChange={(e) => setTavNr(e.target.value)}
                />
              </FormControl>
              {tableErrorMessage !== "" ? (
                <div>
                  <FormLabel sx={{ color: "crimson" }}>
                    {tableErrorMessage}
                  </FormLabel>
                </div>
              ) : (
                ""
              )}
              <Button type="submit" onClick={() => insertTable(tavNr)}>
                Ruaj
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
