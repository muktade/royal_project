export class CommonConstants {

  ///regex
  public static nameRegex = '[a-zA-Z ]*';

  public static emailRegex = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
  public static passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$';

  //variable
  public static error: string = 'error';
}
