import companyActors from "./companyActors";
import { User } from "../entity/User";
import { Company } from "../entity/Company";
import { Employee } from "../entity/Employee";

describe("companyActors", () => {
  let mockDataSource: any;

  beforeEach(() => {
    // Reset the mocks before each test
    mockDataSource = {
      manager: {
        findOne: jest.fn(),
        save: jest.fn(),
      },
    };
  });

  it("returns a 404 error if the user or company does not exist", async () => {
    mockDataSource.manager.findOne.mockResolvedValueOnce(null); // Simulate a non-existing user

    const result = await companyActors(1, 1, mockDataSource);

    expect(result).toEqual({
      employee: null,
      status: 404,
      error: "User or Company not found",
    });
  });

  it("creates a new employee if the user and company exist", async () => {
    mockDataSource.manager.findOne.mockResolvedValueOnce(new User()); // Simulate an existing user
    mockDataSource.manager.findOne.mockResolvedValueOnce(new Company()); // Simulate an existing company

    const result = await companyActors(1, 1, mockDataSource);

    expect(mockDataSource.manager.save).toHaveBeenCalled();
    expect(result.status).toBe(200);
    expect(result.employee).toBeInstanceOf(Employee);
  });
});
