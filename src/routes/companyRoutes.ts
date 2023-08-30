import { Router } from "express";
import { User } from "../entity/User";
import { Employee } from "../entity/Employee";
import { Company } from "../entity/Company";
import companyActors from "./companyActors";

const router = Router();

// a. Make a User an Employee of a Company
router.put("/user/:userId/company/:companyId", async (req, res) => {
  const userId = Number(req.params.userId);
  const companyId = Number(req.params.companyId);

  const results = await companyActors(userId, companyId, req.dataSource);
  if (results?.status === 404) {
    res.status(results!.status).send(results?.error);
  } else {
    res.send({ employee: results.employee });
  }
});

//a.1 This will post a new employee to the company
router.post("/user/:userId/company/:companyId/employee", async (req, res) => {
  const userId = Number(req.params.userId);
  const companyId = Number(req.params.companyId);

  const results = await companyActors(userId, companyId, req.dataSource);
  if (results?.status === 404) {
    res.status(results!.status).send(results?.error);
  } else {
    res.send({ employee: results.employee });
  }
});

// b. Get number of employees for a Company
router.get("/company/:companyId/employees", async (req, res) => {
  const companyId = Number(req.params.companyId);
  const company = await req.dataSource.manager.findOne(Company, {
    where: { id: companyId },
  });

  if (!company) {
    return res.status(404).send({ error: "Company not found" });
  }

  const employeeCount = await req.dataSource.manager.count(Employee, {
    where: { company },
  });
  res.send({ employeeCount });
});

// c. Get number of companies for each business type
router.get("/companies/businessTypes", async (req, res) => {
  const companies = await req.dataSource.manager.find(Company);
  const businessTypes = companies.map((company) => company.businessType);

  const businessTypeCount = businessTypes.reduce(
    (acc: { [key: string]: number }, businessType: string) => {
      if (!acc[businessType]) {
        acc[businessType] = 1;
      } else {
        acc[businessType] += 1;
      }
      return acc;
    },
    {}
  );

  res.send({ businessTypeCount });
});

//  Added a company to the database
router.post("/company", async (req, res) => {
  try {
    let newCompany = new Company();
    newCompany.businessName = req.body.businessName;
    newCompany.businessType = req.body.businessType;

    let savedCompany = await req.dataSource.manager.save(newCompany);
    res.status(201).json(savedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while saving the company.");
  }
});

export default router;
