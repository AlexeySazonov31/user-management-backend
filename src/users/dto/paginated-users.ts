import { User } from '../entities/user.entity';

export interface PaginatedUsers {
  results: User[];
  page: number;
  total_pages: number;
  total_results: number;
}
