import { Company } from "../entity/Company";
import { Employee } from "../entity/Employee";
import { User } from "../entity/User";

async function companyActors(
  userId: number,
  companyId: number,
  dataSource: any
) {
  const user = await dataSource.manager.findOne(User, {
    where: { id: userId },
  });

  const company = await dataSource.manager.findOne(Company, {
    where: { id: companyId },
  });

  if (!user || !company) {
    return { employee: null, status: 404, error: "User or Company not found" };
  }

  const employee = new Employee();
  employee.user = user;
  employee.company = company;

  await dataSource.manager.save(employee);
  return { employee: employee, status: 200 };
}

export default companyActors;
