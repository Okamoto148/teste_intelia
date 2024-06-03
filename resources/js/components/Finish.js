import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

// Componente funcional que renderiza uma lista aninhada de dados do usuário
export default function NestedList({name, birthday, rua, numero, cidade, estado, celular}) {
  const [open, setOpen] = React.useState(true); // Estado para controlar a abertura e fechamento da lista aninhada

  // Função para alternar a visibilidade da lista aninhada
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Dados do usuário
        </ListSubheader>
      }
    >
      {/* Item da lista para exibir o nome do usuário */}
      <ListItemButton>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={`Nome: ${name}`} />
      </ListItemButton>
      {/* Item da lista para exibir a data de nascimento do usuário */}
      <ListItemButton>
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText primary={`Data de nascimento: ${birthday}`} />
      </ListItemButton>
      {/* Item da lista para exibir o endereço do usuário */}
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AddRoadIcon />
        </ListItemIcon>
        <ListItemText primary={`Endereço: ${rua}, ${numero}`} />
        {/* Ícone para indicar se a lista está aberta ou fechada */}
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {/* Lista aninhada para exibir detalhes do endereço */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <LocationCityIcon />
            </ListItemIcon>
            <ListItemText primary={`Cidade: ${cidade} - ${estado}`} />
          </ListItemButton>
        </List>
      </Collapse>
      {/* Item da lista para exibir o celular do usuário */}
      <ListItemButton>
        <ListItemIcon>
          <SmartphoneIcon />
        </ListItemIcon>
        <ListItemText primary={`Celular: ${celular}`} />
      </ListItemButton>
    </List>
  );
}
