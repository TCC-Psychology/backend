import { Injectable } from '@nestjs/common';
import { supabase } from 'src/config/supabase';

@Injectable()
export class AuthService {
  async signIn(email: string, password: string) {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (response.error) {
      throw new Error(response.error.message);
    }
    return response.data;
  }
}
