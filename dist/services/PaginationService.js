"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationService = void 0;
class PaginationService {
    static paginate(repository_1) {
        return __awaiter(this, arguments, void 0, function* (repository, page = 1, limit = 10, order = {}) {
            const totalRecords = yield repository.count();
            const lastPage = Math.ceil(totalRecords / limit);
            if (page > lastPage && lastPage > 0) {
                throw new Error(`Página inválida. Total de página ${lastPage}`);
            }
            const offset = (page - 1) * limit;
            const data = yield repository.find({
                take: limit,
                skip: offset,
                order,
            });
            return {
                error: false,
                data,
                currentPage: page,
                lastPage,
                totalRecords
            };
        });
    }
}
exports.PaginationService = PaginationService;
