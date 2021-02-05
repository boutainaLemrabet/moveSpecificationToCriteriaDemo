package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.EmployeeSkillDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EmployeeSkill} and its DTO {@link EmployeeSkillDTO}.
 */
@Mapper(componentModel = "spring", uses = { EmployeeMapper.class })
public interface EmployeeSkillMapper extends EntityMapper<EmployeeSkillDTO, EmployeeSkill> {
    @Mapping(target = "employee", source = "employee", qualifiedByName = "fullname")
    @Mapping(target = "teacher", source = "teacher", qualifiedByName = "fullname")
    EmployeeSkillDTO toDto(EmployeeSkill employeeSkill);

    @Mapping(target = "id.name", source = "name")
    @Mapping(target = "id.employeeUsername", source = "employee.username")
    EmployeeSkill toEntity(EmployeeSkillDTO employeeSkillDTO);
}
