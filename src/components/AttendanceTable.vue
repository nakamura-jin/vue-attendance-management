<style lang="scss" scoped>
  @import '@/styles/AttendanceTable.scss';
</style>

<template>
  <div class="list">
    <table>
      <tr>
        <th class="list__ttl-day">日付</th>
        <th class="list__ttl-start">出勤時間</th>
        <th class="list__ttl-end">退勤時間</th>
        <th class="list__ttl-breake">休憩時間</th>
        <th class="list__ttl-remarks">備考</th>
        <th class="list__ttl-edit">編集</th>
      </tr>
      <tr>
        <td class="list__day">1日</td>
        <td class="list__start">9:00</td>
        <td class="list__end">18:00</td>
        <td class="list__breake">1:00</td>
        <td class="list__remarks">テストテスト。。。</td>
        <td class="list__edit"><button><font-awesome-icon icon="fa-solid fa-pen" /></button></td>
      </tr>
      <tr>
        <td class="list__day">2日</td>
        <td class="list__start">9:00</td>
        <td class="list__end">18:00</td>
        <td class="list__breake">1:00</td>
        <td class="list__remarks">テストテスト。。。</td>
        <td class="list__edit"><button><font-awesome-icon icon="fa-solid fa-pen" /></button></td>
      </tr>
    </table>
  </div>
</template>