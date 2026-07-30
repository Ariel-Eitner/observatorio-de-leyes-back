import { ProfileFieldsDto } from '../../common/dto/profile-fields.dto';

// Editar el perfil: nombre + todos los campos opcionales. Todo es opcional;
// los campos ausentes no se tocan (ver UsersService.updateProfile).
export class UpdateProfileDto extends ProfileFieldsDto {}
