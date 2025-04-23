/* eslint-disable react/prop-types */
import {
    Box,
    Container,
    Paper,
    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Divider,
} from '@mui/material';
import Grid from "@mui/material/Grid2";
import { Save } from '@mui/icons-material';



const BaseForm = ({
    title,
    children,
    onSave,
    maxWidth = 'lg',
    saveText = 'Guardar',
    //isEditing = false
}) => {

    return (
        <Container
            maxWidth={maxWidth}
            sx={{
                margin: "0.5rem auto",
                minHeight: 'calc(100vh - 200px)',
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    backgroundColor: '#ffffff'
                }}
            >
                {/* Encabezado del formulario */}
                <Box sx={{ mb: 4 }} textAlign='center'>
                    <Typography
                        variant="h5"
                        component="h1"
                        sx={{
                            fontWeight: 600,
                            color: '#42526e',
                            mb: 1
                        }}
                    >
                        {title}
                    </Typography>
                    <Divider />
                </Box>

                {/* Campos del formulario */}
                <Box component="form" onSubmit={onSave}>
                    <Grid container spacing={3}>
                        {children}
                    </Grid>

                    {/* Acciones del formulario */}
                    <Box sx={{
                        mt: 4,
                        pt: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        borderTop: '1px solid #e0e0e0'
                    }}>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<Save />}
                            sx={{
                                backgroundColor: '#0079bf',
                                '&:hover': {
                                    backgroundColor: '#0067a3'
                                }
                            }}
                        >
                            {saveText}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

// Componentes de campos reutilizables
const TextInput = ({
    label,
    name,
    value,
    onChange,
    required = false,
    xs = 12,
    sm = 6,
    ...props
}) => (
    <Grid item xs={xs} sm={sm}>
        <TextField
            fullWidth
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            InputLabelProps={{ shrink: true }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                        borderColor: '#a7b6c2',
                    },
                }
            }}
            {...props}
        />
    </Grid>
);

const SelectInput = ({
    label,
    name,
    value,
    onChange,
    options = [],
    required = false,
    xs = 12,
    sm = 6
}) => (
    <Grid item xs={xs} sm={sm}>
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e0e0e0',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#a7b6c2',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Grid>
);

const CheckboxInput = ({
    label,
    name,
    checked,
    onChange,
    xs = 12,
    sm = 6
}) => (
    <Grid item xs={xs} sm={sm}>
        <FormControlLabel
            control={
                <Checkbox
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    color="primary"
                />
            }
            label={label}
            sx={{ color: '#42526e' }}
        />
    </Grid>
);

// Agregar los componentes de campos al formulario base para facilitar el acceso
BaseForm.TextInput = TextInput;
BaseForm.SelectInput = SelectInput;
BaseForm.CheckboxInput = CheckboxInput;

export default BaseForm;