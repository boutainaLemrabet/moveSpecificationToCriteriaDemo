package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.Employee;
import com.mycompany.myapp.domain.EmployeeSkill;
import com.mycompany.myapp.domain.Employee_;
import java.io.Serializable;
import java.util.Objects;
import org.springframework.data.jpa.domain.Specification;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.mycompany.myapp.domain.Employee} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.EmployeeResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /employees?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class EmployeeCriteria extends Criteria<Employee> implements Serializable {

    private static final long serialVersionUID = 1L;

    private StringFilter username;

    private StringFilter fullname;

    private EmployeeCriteria teamMember;

    private EmployeeSkillCriteria skill;

    private EmployeeSkillCriteria taughtSkill;

    private EmployeeCriteria manager;

    public EmployeeCriteria() {}

    public EmployeeCriteria(EmployeeCriteria other) {
        this.username = other.username == null ? null : other.username.copy();
        this.fullname = other.fullname == null ? null : other.fullname.copy();
        this.teamMember = other.teamMember == null ? null : other.teamMember.copy();
        this.skill = other.skill == null ? null : other.skill.copy();
        this.taughtSkill = other.taughtSkill == null ? null : other.taughtSkill.copy();
        this.manager = other.manager == null ? null : other.manager.copy();
    }

    @Override
    public EmployeeCriteria copy() {
        return new EmployeeCriteria(this);
    }

    @Override
    public Specification<Employee> toSpecification() {
        Specification<Employee> specification = Specification.where(null);
        if (this.getUsername() != null) {
            specification = specification.and(buildStringSpecification(this.getUsername(), Employee_.username));
        }
        if (this.getFullname() != null) {
            specification = specification.and(buildStringSpecification(this.getFullname(), Employee_.fullname));
        }

        if (this.getTeamMember() != null) {
            specification =
                specification.and(buildReferringEntitySpecification(this.getTeamMember(), Employee_.teamMembers, Employee.class));
        }
        if (this.getSkill() != null) {
            specification = specification.and(buildReferringEntitySpecification(this.getSkill(), Employee_.skills, EmployeeSkill.class));
        }
        if (this.getTaughtSkill() != null) {
            specification =
                specification.and(buildReferringEntitySpecification(this.getTaughtSkill(), Employee_.taughtSkills, EmployeeSkill.class));
        }
        if (this.getManager() != null) {
            specification = specification.and(buildReferringEntitySpecification(this.getManager(), Employee_.manager, Employee.class));
        }
        return specification;
    }

    public StringFilter getUsername() {
        return username;
    }

    public void setUsername(StringFilter username) {
        this.username = username;
    }

    public StringFilter getFullname() {
        return fullname;
    }

    public void setFullname(StringFilter fullname) {
        this.fullname = fullname;
    }

    public EmployeeCriteria getTeamMember() {
        return teamMember;
    }

    public void setTeamMember(EmployeeCriteria teamMember) {
        this.teamMember = teamMember;
    }

    public EmployeeSkillCriteria getSkill() {
        return skill;
    }

    public void setSkill(EmployeeSkillCriteria skill) {
        this.skill = skill;
    }

    public EmployeeSkillCriteria getTaughtSkill() {
        return taughtSkill;
    }

    public void setTaughtSkill(EmployeeSkillCriteria taughtSkill) {
        this.taughtSkill = taughtSkill;
    }

    public EmployeeCriteria getManager() {
        return manager;
    }

    public void setManager(EmployeeCriteria manager) {
        this.manager = manager;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final EmployeeCriteria that = (EmployeeCriteria) o;
        return (
            Objects.equals(username, that.username) &&
            Objects.equals(fullname, that.fullname) &&
            Objects.equals(teamMember, that.teamMember) &&
            Objects.equals(skill, that.skill) &&
            Objects.equals(taughtSkill, that.taughtSkill) &&
            Objects.equals(manager, that.manager)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, fullname, teamMember, skill, taughtSkill, manager);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeCriteria{" +
            (username != null ? "username=" + username + ", " : "") +
            (fullname != null ? "fullname=" + fullname + ", " : "") +
            (teamMember != null ? "teamMember=" + teamMember + ", " : "") +
            (skill != null ? "skill=" + skill + ", " : "") +
            (taughtSkill != null ? "taughtSkill=" + taughtSkill + ", " : "") +
            (manager != null ? "manager=" + manager + ", " : "") +
            "}";
    }
}
