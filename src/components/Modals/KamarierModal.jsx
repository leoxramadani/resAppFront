import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import { GET_ALL_ROLES } from '../../endpoints/Roles/RolesEnd';
import useQuery from '../hooks/useQuery';
import { MenuItem, Option, Select } from '@mui/joy';
import axios from 'axios';
import { CREATE_NEW_EMPLOYEE, GET_ALL_KAMARIERAT } from '../../endpoints/Kamarierat/KamarieratEnd';

export default function KamarierModal({setOpen,open}) {


    const { data: roles } = useQuery(GET_ALL_ROLES);

    const [name,setName] = React.useState("");
    const [surname,setSurname] = React.useState("");
    const [roleId,setRoleId] = React.useState(0);
    const [username,setUsername] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [contactInfo,setContactinfo] = React.useState("");



  const {refetch:refetchKam } = useQuery(GET_ALL_KAMARIERAT);


    const createNewEmployee= async (name,surname,roleId,username,password,contactInfo) => {
        try{
          const res = await axios.post(CREATE_NEW_EMPLOYEE, {name: name,surname: surname, roleId: roleId, username: username,password: password, contactInfo: contactInfo}, {withCredentials:true});
          console.log("res=",res);
          refetchKam();
        }catch(error){
          console.error("Error=",error)
        }
      };


      const handleChange = (event, newValue) => {
        setRoleId(newValue);
    };

    console.log("roleId=",roleId,",name=",name,",surname=",surname,",username=",username,",password=",password,",contact=",contactInfo);
  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Shto kamarierin e ri</DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
              createNewEmployee(name,surname,roleId,username,password,contactInfo);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Emri</FormLabel>
                <Input autoFocus 
                       required 
                       onChange={(e) => setName(e.target.value)}         
                />
              </FormControl>
              <FormControl>
                <FormLabel>Mbiemri</FormLabel>
                <Input  required 
                        onChange={(e) => setSurname(e.target.value)}  
                />
              </FormControl>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input  required 
                        onChange={(e) => setUsername(e.target.value)}  
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input  required 
                        onChange={(e) => setPassword(e.target.value)}  
                />
              </FormControl>
              <FormControl>
                <FormLabel>Numri i telefonit</FormLabel>
                <Input  required
                        onChange={(e) => setContactinfo(e.target.value)}  
                />
              </FormControl>
              <FormControl>
                <FormLabel>Roli</FormLabel>
                <Select
                    value={roleId}
                    onChange={handleChange}
                >
                    {roles && roles.map((role) => (
                        <Option
                            key={role.id} 
                            value={role.id}
                        >
                            {role.roleName}
                        </Option>
                    ))}
                </Select>
              </FormControl>
              <Button type="submit">Shto</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}