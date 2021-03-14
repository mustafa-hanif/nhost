<template>
  <div>
    Dashboard sweet dashboard <br /><br />

    <div v-for="team in teams" :key="team.idllo">
      Team {{ team.name }} with id {{team.id}}
      <br />
    </div>
    <br />

    <input type="button" @click="logout" value="Logout">
  </div>
</template>

<script>
import gql from 'graphql-tag';

const SUBSCRIPTION_TEAMS = gql`
subscription ($userId: uuid!) {
  teams (where: { owner_user_id: { _eq: $userId}}) {
    id
    name
  }
}
`;

export default {
  nhostAuth: true,
  methods: {
    logout() {
      this.$nhost.auth.logout().then(() => {
        this.$router.push(this.$nhost.$options.routes.logout);
      });
    }
  },
  apollo: {
    teams: gql`
      query {
        teams {
          id
          name
        }
      }
    `,
    $subscribe: {
      teams_updated: {
        query: SUBSCRIPTION_TEAMS,
        variables () {
          // console.log(JSON.stringify(this.$nhost.auth, null, 2))
          return {
            userId: this.$nhost.auth.user().id
          }
        },
        result({data}) {
          this.teams = data.teams;
        }
      }
    }
  }
}
</script>
