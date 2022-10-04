<template>
  <div>
    <PagesPatientsDetails :id="$route.params.id" />
    <div class="row">
      <div class="col-4">
        <PagesPatientsSidebarNav />
      </div>
      <div class="col">
        <NuxtChild />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PatientDetails',
}
</script>
