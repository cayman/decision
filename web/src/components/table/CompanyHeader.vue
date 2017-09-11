<template>
    <tbody>
        <tr class="companyHeader">
            <td class="companyHeader__num">
                <router-link :to="{ name: 'company', params: { companyId: company.id }}">{{ company.id }}</router-link>
            </td>
            <td class="companyHeader__caption" :colspan="years.length+2">
                <div class="companyHeader__name">
                    <span @click="nameClick()" >
                                        <i class="fa fa-minus-square-o" aria-hidden="true" v-if="company.expanded"></i>
                <i class="fa fa-plus-square-o" aria-hidden="true" v-else></i>
                        {{ company.name }}</span>
                    <span v-if="company.weight>0" class="weight positive">{{ company.weight | decision }}</span>
                    <span v-else-if="company.weight<0" class="weight negative">{{ company.weight | decision }}</span>
                </div>
                <div class="companyHeader__menu">
                    <company-instruments class="instruments" :company="company"></company-instruments>
                    <company-links  :company="company"></company-links>
                </div>
            </td>
        </tr>
    </tbody>
</template>

<script>
    import CompanyLinks from '../links/CompanyLinks.vue'
    import CompanyInstruments from '../instruments/CompanyInstruments.vue'

    export default {
        name:'company-header',
        components: {
            CompanyLinks,CompanyInstruments
        },
        props: ['company','years'],
        methods: {
            nameClick: function () {
                console.log('nameClick',this.company.name);
                this.$emit('name-click',this.company);
            }
        },
    }
</script>


<style rel="stylesheet/scss" lang="scss">

    @import "../../assets/style.scss";

    .companyHeader {
        font: $table_name_fonts;
        color: $font_color;
        background-color: $caption_color2;

        &__num{
            width: $col_num_width;
        }
        &__caption {
            width: $col_name_width;
            a {
                color: #26405d;
            }
        }
        &__name{
            font: bold $table_name_fonts;
            float:left;
            text-align: left;

            .weight{
                font: normal $table_small_fonts;
            }
            .positive{
                background-color: $positive_background;
            }
            //
            .negative{
                background-color: $negative_background;
            }

        }
        &__menu{
            float:right;
            text-align: right;
        }

        a {
            color: #26405d;
        }

    }


</style>