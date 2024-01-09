import { EmployeeModel, LocationModel, PositionModel } from "../../data";
import { CustomError, EmployeeDatasource, EmployeeEntity, GetEmployeeDto } from "../../domain";
import { EmployeeMapper } from "../mappers/employee.mapper";

export class EmployeeDatasourceImpl implements EmployeeDatasource {

  async getEmployees(): Promise<EmployeeEntity[]> {
    try {

      const employees = await EmployeeModel.findAll({
        include: [{
          model: PositionModel,
        },
        {
          model: LocationModel,
        }]
      })

      return employees.map((EmployeeMapper.employeeEntityFromObject))

    } catch (error) {

      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalError()

    }

  }

  async getEmployee(getEmployeeDto: GetEmployeeDto): Promise<EmployeeEntity> {
    try {

      const { employeeNumber } = getEmployeeDto

      const employee = await EmployeeModel.findOne({ where: { employee_number: employeeNumber } })

      return EmployeeMapper.employeeEntityFromObject(employee?.get({ plain: true }))

    } catch (error) {

      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalError()

    }

  }
}