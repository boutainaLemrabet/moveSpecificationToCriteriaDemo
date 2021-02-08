# Move the logic of converting criteria to specification

1. Move the logic of converting criteria to specification out of EntityQueryService and put it in EntityCriteria.
2. teck.jhipster.queryService that has all buildSpecification methods is being deprecated in favor of a helper class called Criteria with all methods.

