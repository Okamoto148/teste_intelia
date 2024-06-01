import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from './Input';
import Finish from './Finish';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Looks3Icon from '@mui/icons-material/Looks3';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';



const steps = ['Dados Pessoais', 'Endereço', 'Contato'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [name, setName] = React.useState('');
  const [birthday, setBirthday] = React.useState('');
  const [CEP, setCEP] = React.useState('');
  const [endereco, setEndereco] = React.useState('');
  const [error, setError] = React.useState('');
  const [rua, setRua] = React.useState('');
  const [numero, setNumero] = React.useState('');
  const [cidade, setCidade] = React.useState('');
  const [estado, setEstado] = React.useState('');
  const [telefone, setTelefone] = React.useState('');
  const [celular, setCelular] = React.useState('');
  const [userId, setUserId] = React.useState(localStorage.getItem('userId') || null);
  
  //Constantes para validação dos dados
  const [isValidCEP, setIsValidCEP] = React.useState(true); 
  const [isValidNome, setIsValidNome] = React.useState(true); 
  const [isValidBirthday, setIsValidBirthday] = React.useState(true); 
  const [isValidTelefone, setIsValidTelefone] = React.useState(true); 
  const [isValidCelular, setIsValidCelular] = React.useState(true); 
  
  //Faz a requisição para descobrir o endereço e a validação do CEP
  React.useEffect(() => {
        if (CEP.length === 9) {
      axios.get(`https://viacep.com.br/ws/${CEP.replace(/\D/g, '')}/json/`)
        .then((response) => {
          console.log(response.data);
          setEndereco(response.data);
          setRua(response.data.logradouro);
          setCidade(response.data.localidade);
          setEstado(response.data.uf);
          setIsValidCEP(true);
        })
        .catch(() => {
          setIsValidCEP(false);
        });
    } else {
      setEndereco('');
      setRua('');
      setCidade('');
      setEstado('');

      if (CEP.length > 0 && CEP.length < 9) {
        setIsValidCEP(false);
      } else {
        setIsValidCEP(true);
      }
    }
    console.log('CEP.length', CEP.length);

  }, [CEP]);
  
  React.useEffect(()=>{
	  if (name.split(' ').length > 1 || name.length <= 1) {
      setIsValidNome(true);
    } else {
      setIsValidNome(false);
    }

    if (telefone.length === 14 || telefone.length <= 1) {
      setIsValidTelefone(true);
    } else {
      setIsValidTelefone(false);
    }

    if (celular.length === 15 || celular.length <= 1) {
      setIsValidCelular(true);
    } else {
      setIsValidCelular(false);
    }

    if (birthday.length === 10 || birthday.length <= 1) {
      setIsValidBirthday(true);
    } else {
      setIsValidBirthday(false);
    }
  },[name, celular, telefone,birthday]);
  


  React.useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            axios.get(`/userdata/${storedUserId}`)
                .then(response => {
                    const data = response.data;
                    setName(data.name);
                    setBirthday(data.birthday);
                    setCEP(data.cep);
                    setRua(data.rua);
                    setNumero(data.numero);
                    setCidade(data.cidade);
                    setEstado(data.estado);
                    setTelefone(data.telefone);
                    setCelular(data.celular);
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, []);

    const handleNext = async () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        if (activeStep === 0) {
            const rawBirthday = birthday.replace(/\D/g, '');
            setBirthday(rawBirthday);
        }

        if (activeStep === 1) {
            const rawCep = CEP.replace(/\D/g, '');
            setCEP(rawCep);
        }

        if (activeStep === 2) {
            const rawTelefone = telefone.replace(/\D/g, '');
            const rawCelular = celular.replace(/\D/g, '');

            const payload = {
                name,
                birthday: birthday.replace(/\D/g, ''),
                cep: CEP.replace(/\D/g, ''),
                rua,
                numero,
                cidade,
                estado,
                telefone: rawTelefone,
                celular: rawCelular
            };

            
                const response = await axios.post('/userdata', payload)
                    .catch(error => console.error('Error saving user data:', error));
                setUserId(response.data.id);
                localStorage.setItem('userId', response.data.id);
            
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setName('');
        setBirthday('');
        setCEP('');
        setRua('');
        setNumero('');
        setCidade('');
        setEstado('');
        setTelefone('');
        setCelular('');
        setUserId(null);
        localStorage.removeItem('userId');
    };

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };



  // Função Capitalize
  function capitalizeWords(sentence) {
    return sentence.toLowerCase().replace(/\b\w+/g, (match) => {
      if (match.toLowerCase() === 'de' || match.toLowerCase() === 'e' || match.toLowerCase() === 'da') {
        return match.toLowerCase();
      } else {
        return match.charAt(0).toUpperCase() + match.slice(1);
      }
    });
  }

  // Máscara da data de nascimento
const handleBirthdayChange = (rawValue) => {
  const cleanedValue = rawValue.replace(/\D/g, ''); 
  let maskedValue = '';

  if (cleanedValue.length <= 6) {
    maskedValue = cleanedValue.replace(/(\d{2})(\d{1,2})/, '$1/$2');
  } else {
    maskedValue = cleanedValue.replace(/(\d{2})(\d{2})(\d{1,2})/, '$1/$2/$3');
  }
  console.log('maskedValue', maskedValue);

  if (cleanedValue.length <= 8){
	setBirthday(maskedValue);
  }
};

  const handleCepChange = (event) => {
    let newCep = event;

    newCep = newCep.replace(/\D/g, '');

    if (newCep.length > 5) {
      newCep = newCep.replace(/^(\d{5})(\d)/, '$1-$2');
    }

	if (newCep.length <= 9) {
		setCEP(newCep);
	};
  }
  
  const handleCelularChange = (event) => {
    let newCelular = event;
    newCelular = newCelular.replace(/\D/g, '');
    if (newCelular.length > 2) {
      newCelular = `(${newCelular.slice(0, 2)}) ${newCelular.slice(2)}`;
    }
    if (newCelular.length > 8) {
      newCelular = `${newCelular.slice(0, 10)}-${newCelular.slice(10)}`;
    }
	if(newCelular.length<=15){
		setCelular(newCelular);
	}
  };
  
  
  const handleTelefoneFixoChange = (event) => {
    let newTelefoneFixo = event;
    newTelefoneFixo = newTelefoneFixo.replace(/\D/g, '');
    if (newTelefoneFixo.length > 2) {
      newTelefoneFixo = `(${newTelefoneFixo.slice(0, 2)}) ${newTelefoneFixo.slice(2)}`;
    }
    if (newTelefoneFixo.length > 7) {
      newTelefoneFixo = `${newTelefoneFixo.slice(0, 9)}-${newTelefoneFixo.slice(9)}`;
    }

	if(newTelefoneFixo.length<=14){
		setTelefone(newTelefoneFixo);
	}
    
  };



  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption"></Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Cadastro Completo
          </Typography>
		  <Finish name={name} birthday={birthday} rua={rua} numero={numero} cidade={cidade} estado={estado} celular={celular}/>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, ml: 1 }}><span style={{marginRight:'10px'}}>{(activeStep+1==1)&&<AccountCircle />}
              {(activeStep+1==2)&&<LocationCityIcon />}{(activeStep+1==3)&&<PhoneAndroidIcon />}</span>{steps[activeStep]}</Typography>
          {activeStep === 0 &&
            <>
              <div>
                <Input activeStep={activeStep} value={name} icon1={true} onChangeInput={(e) => setName(capitalizeWords(e))} label='Nome' />
				{!isValidNome && <p style={{ color: 'red' }}>Favor colocar o nome completo</p>}
                <Input activeStep={activeStep} value2={birthday} icon2={true} onChangeInput2={handleBirthdayChange} label='Data de nascimento' />
                {!isValidBirthday && <p style={{ color: 'red' }}>A data de nascimento precisa estar no formato: DD/MM/AAAA</p>}
              </div>
            </>}
          {activeStep === 1 &&
            <>
              <div>
                <Input activeStep={activeStep} value={CEP} icon1={true} onChangeInput={handleCepChange} label='CEP' />
				{!isValidCEP && <p style={{ color: 'red' }}>O CEP está incompleto</p>}
				<Grid container>
				<Grid  xs={8}>
				  <Input activeStep={activeStep} value2={rua} icon2={true} onChangeInput2={(e) => setRua(e)} label2='Endereço'/>
				</Grid>
				<Grid  xs={4}>
				  <Input activeStep={activeStep} value3={numero} icon3={true} onChangeInput3={(e) => setNumero(e)} label3='Número' />
				</Grid>
				</Grid>
				
				<Grid container>
				<Grid  xs={6}>
				  <Input activeStep={activeStep} value4={cidade} icon4={true} onChangeInput4={(e) => setCidade(e)} label4='Cidade' />
				</Grid>
				<Grid  xs={6}>
				  <Input activeStep={activeStep} value5={estado} icon5={true} onChangeInput5={(e) => setEstado(e)} label5='Estado' />
				</Grid>
				</Grid>
				
              </div>
            </>}
          {activeStep === 2 &&
            <>
              <div>
                <Input activeStep={activeStep} value={telefone} icon1={true} onChangeInput={handleTelefoneFixoChange} label='Telefone fixo' />
				{!isValidTelefone && <p style={{ color: 'red' }}>O telefone está incompleto</p>}
                <Input activeStep={activeStep} value2={celular} icon2={true} onChangeInput2={handleCelularChange} label='Celular' />
				{!isValidCelular && <p style={{ color: 'red' }}>O celular está incompleto</p>}
              </div>
            </>}
			
			 
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Voltar
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
            </Button>
          </Box>
        </React.Fragment>
      )}
	  
	  
    </Box>
  );
}
