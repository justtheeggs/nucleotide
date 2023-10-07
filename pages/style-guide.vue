<template>
  <DefaultLayout title="Style Guide">
    <SubHeader>This is a sub header(H2)</SubHeader>
    <p>
      This is a paragraph of normal text. Bacon ipsum dolor amet shank salami tail rump capicola,
      turducken boudin kevin landjaeger doner pork tri-tip brisket hamburger. Tri-tip boudin brisket
      jerky rump shankle salami tail tenderloin short ribs sirloin shank swine venison. Beef jowl
      tenderloin filet mignon cow doner. Biltong flank turkey tail rump doner alcatra beef ribs
      chuck shoulder pastrami prosciutto. Boudin capicola pig tenderloin andouille shoulder salami
      shank. Ribeye bresaola cupim shankle. Brisket strip steak chuck ham hock pig pork belly.
    </p>
    <div>
      <SubHeader>Buttons</SubHeader>
      <PrimaryButton class="mr-4">
        Primary Button
      </PrimaryButton>
      <SubmitButton class="mx-4" @click="sendAlert">
        Submit Button
      </SubmitButton>
      <CancelButton class="mx-4">
        Cancel Button
      </CancelButton>
      <PrimaryButton to="/about" disabled class="mx-4">
        Disabled Primary Button
      </PrimaryButton>
      <SubmitButton disabled class="ml-4">
        Disabled Submit Button
      </SubmitButton>
    </div>
  </DefaultLayout>
</template>
<script setup lang="ts">
function sendAlert () {
  alert('here')
}
</script>
