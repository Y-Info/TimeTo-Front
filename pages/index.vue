<template>
    <v-container>
    <h1>Evenement mis en avant</h1>
    <CardEvent />
    <CardEvent />
    <CardEvent />
    <CardEvent />
      <v-row>
        <v-col class="col-6">
          <h1>Categories misent en avant</h1>
          <div class="options">
            <div
              v-for="category in categories"
              :key="category.id"
              v-on:click="activate(category.id)"
              v-bind:class="{ active : activeCat == category.id }"
              v-bind:style="{ backgroundImage: 'url(' + category.bgImage + ')' }"
              class="option"
            >
              <div class="shadow" />
              <div class="label">
                <div class="icon">
                  <i
                    v-bind:class="category.fontAwsomeIcon"
                    class="fas"
                  />
                </div>
                <div class="infoCategory">
                  <div class="main">
                    {{ category.mainInfo }}
                  </div>
                  <div class="sub">
                    {{ category.secondaryinfo }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="col-6">
          <h1>Categories</h1>
          <CardCategory />
          <CardCategory />
          <CardCategory />
          <CardCategory />
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
import CardEvent from '../components/CardEvent'
import CardCategory from '../components/CardCategory'

export default {
  components: {
    CardEvent,
    CardCategory
  },
  data () {
    return {
      categories: [
        {
          id: 1,
          fontAwsomeIcon: 'fa-walking',
          bgImage: 'https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg',
          mainInfo: 'Blonkisoaz',
          secondaryinfo: 'Omuke trughte a otufta'
        },
        {
          id: 2,
          fontAwsomeIcon: 'fa-snowflake',
          bgImage: 'https://66.media.tumblr.com/8b69cdde47aa952e4176b4200052abf4/tumblr_o51p7mFFF21qho82wo1_1280.jpg',
          mainInfo: 'Blonkisoaz',
          secondaryinfo: 'Omuke trughte a otufta'
        },
        {
          id: 3,
          fontAwsomeIcon: 'fa-tree',
          bgImage: 'https://66.media.tumblr.com/5af3f8303456e376ceda1517553ba786/tumblr_o4986gakjh1qho82wo1_1280.jpg',
          mainInfo: 'Blonkisoaz',
          secondaryinfo: 'Omuke trughte a otufta'
        },
        {
          id: 4,
          fontAwsomeIcon: 'fa-tint',
          bgImage: 'https://66.media.tumblr.com/5516a22e0cdacaa85311ec3f8fd1e9ef/tumblr_o45jwvdsL11qho82wo1_1280.jpg',
          mainInfo: 'Blonkisoaz',
          secondaryinfo: 'Omuke trughte a otufta'
        }
      ],
      activeCat: 1
    }
  },
  methods: {
    activate (cat) {
      this.activeCat = cat
    }
  }
}
</script>
