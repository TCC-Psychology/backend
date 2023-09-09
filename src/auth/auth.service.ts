import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signUp(email: string, password: string) {
    const supabaseClient = await this.supabaseService.getClient();

    const response = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data;
  }
}
