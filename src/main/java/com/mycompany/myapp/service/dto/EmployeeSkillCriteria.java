package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.Employee;
import com.mycompany.myapp.domain.EmployeeSkill;
import com.mycompany.myapp.domain.EmployeeSkill_;
import java.io.Serializable;
import java.util.Objects;
import org.springframework.data.jpa.domain.Specification;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.mycompany.myapp.domain.EmployeeSkill} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.EmployeeSkillResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /employee-skills?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class EmployeeSkillCriteria extends Criteria<EmployeeSkill> implements Serializable {

    private static final long serialVersionUID = 1L;

    private StringFilter name;

    private IntegerFilter level;

    private EmployeeCriteria employee;

    private EmployeeCriteria teacher;

    public EmployeeSkillCriteria() {}

    public EmployeeSkillCriteria(EmployeeSkillCriteria other) {
        this.name = other.name == null ? null : other.name.copy();
        this.level = other.level == null ? null : other.level.copy();
        this.employee = other.employee == null ? null : other.employee.copy();
        this.teacher = other.teacher == null ? null : other.teacher.copy();
    }

    @Override
    public EmployeeSkillCriteria copy() {
        return new EmployeeSkillCriteria(this);
    }

    @Override
    public Specification<EmployeeSkill> toSpecification() {
        Specification<EmployeeSkill> specification = Specification.where(null);
        if (this.getName() != null) {
            specification = specification.and(buildStringSpecification(this.getName(), EmployeeSkill_.name));
        }
        if (this.getLevel() != null) {
            specification = specification.and(buildRangeSpecification(this.getLevel(), EmployeeSkill_.level));
        }

        if (this.getEmployee() != null) {
            specification =
                specification.and(buildReferringEntitySpecification(this.getEmployee(), EmployeeSkill_.employee, Employee.class));
        }
        if (this.getTeacher() != null) {
            specification = specification.and(buildReferringEntitySpecification(this.getTeacher(), EmployeeSkill_.teacher, Employee.class));
        }
        return specification;
    }

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public IntegerFilter getLevel() {
        return level;
    }

    public void setLevel(IntegerFilter level) {
        this.level = level;
    }

    public EmployeeCriteria getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeCriteria employee) {
        this.employee = employee;
    }

    public EmployeeCriteria getTeacher() {
        return teacher;
    }

    public void setTeacher(EmployeeCriteria teacher) {
        this.teacher = teacher;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final EmployeeSkillCriteria that = (EmployeeSkillCriteria) o;
        return (
            Objects.equals(name, that.name) &&
            Objects.equals(level, that.level) &&
            Objects.equals(employee, that.employee) &&
            Objects.equals(teacher, that.teacher)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, level, employee, teacher);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeSkillCriteria{" +
            (name != null ? "name=" + name + ", " : "") +
            (level != null ? "level=" + level + ", " : "") +
            (employee != null ? "employee=" + employee + ", " : "") +
            (teacher != null ? "teacher=" + teacher + ", " : "") +
            "}";
    }
}
