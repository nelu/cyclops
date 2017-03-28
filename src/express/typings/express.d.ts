/**
 * Express namespace with custom session variables.
 */
declare namespace Express {
  export interface Session {
    token: string | undefined;
    user: {
      id: number;
      company: number;
      email: string;
      first_name: string;
      last_name: string;
      is_staff: boolean;
    } | undefined;
    authenticated: boolean;
  }
}
