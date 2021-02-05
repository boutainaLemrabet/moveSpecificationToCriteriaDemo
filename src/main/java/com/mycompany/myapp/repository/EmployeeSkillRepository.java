package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.EmployeeSkill;
import com.mycompany.myapp.domain.EmployeeSkillId;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the EmployeeSkill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeSkillRepository extends JpaRepository<EmployeeSkill, EmployeeSkillId>, JpaSpecificationExecutor<EmployeeSkill> {}
