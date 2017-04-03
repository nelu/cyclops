/**
 * Express namespace with custom session variables.
 */
declare namespace Express {
  export interface Session {
    token?: string;
    user?: {
      /** ID of the user. */
      id: number;
      /** Company the user is associated with. */
      company: number;
      /** Email of the user. */
      email: string;
      /** First name of the user. */
      first_name: string;
      /** Last name of the user. */
      last_name: string;
      /** If the user is considered staff. */
      is_staff: boolean;
    };
    authenticated: boolean;
  }
}
