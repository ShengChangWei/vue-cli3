<template>
	<div class="home-content">
		<div class="content-left">
			<el-menu
					default-active="1-4-1"
					class="el-menu-vertical-demo"
					background-color="#545c64"
					text-color="#fff"
					active-text-color="#ffd04b"
					:collapse="isCollapse">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span slot="title">教师管理</span>
					</template>
					<el-menu-item index="22" @click="toPath('/teacher')">
						<i class="el-icon-menu"></i>
						<span slot="title">学分制度</span>
					</el-menu-item>
				</el-submenu>
				<el-menu-item index="2" @click="toPath('/study')">
					<i class="el-icon-menu"></i>
					<span slot="title">学生管理</span>
				</el-menu-item>
				<el-menu-item index="3" @click="toPath('/academy')">
					<i class="el-icon-document"></i>
					<span slot="title">学院管理</span>
				</el-menu-item>
				<el-menu-item index="4">
					<i class="el-icon-setting"></i>
					<span slot="title">系统管理</span>
				</el-menu-item>
			</el-menu>
		</div>
		<div class="content-right">
			<div class="right-header">
				<div class="toggle-btn pull-left">
					<i class="fa fa-bars" :class="{'active': isCollapse}" @click="toggleNav"></i>
				</div>
				<div class="pull-right user">
					<i class="fa fa-arrows-alt" @click="fullscreen"></i>
					<el-dropdown>
					  <span class="el-dropdown-link">
					    管理员
					  </span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>修改密码</el-dropdown-item>
							<el-dropdown-item divided>
								<span @click="logout">退出</span>
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { Message } from 'element-ui';
    import { removeUserInfo } from "../../services/auth.service";
    import screenfull from 'screenfull/dist/screenfull.js';


    @Component({
        components: {},
    })
    export default class Home extends Vue {
        isCollapse: boolean = false;
        request: any = Vue;

        count: any;

        constructor() {
            super();
        }

        toggleNav() {
            this.isCollapse = !this.isCollapse;
            // console.dir(EventsServices);
            // console.dir(EventsServices.prototype);
        }


        /**
         * 退出登录
         */
        logout() {
            this.request.prototype.$http.post('/UserController/logout').then((data: any) => {
                const res = data.data;
                if (res.code === 'ok') {
                    Message({
                        message: res.info,
                        type: 'success',
                        duration: 1000
                    });
                    removeUserInfo();
                    this.$router.push({path: '/login'});
                }
            });
        }

        toPath(path: string) {
            this.$router.push({path: path});
        }

        fullscreen() {
            if (screenfull && screenfull.enabled) {
                screenfull.toggle();
            } else {
                this.$message({
                    message: 'you browser can not work',
                    type: 'warning'
                });
                return;
            }
        }
    }
</script>

<style lang="scss">

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		/*min-height: 400px;*/
	}

	.home-content {
		height: 100%;
		width: 100%;
		display: flex;
		.content-left {
			/*width: 200px;*/
			background-color: #545C64;
		}

		.content-right {
			flex: 1;

			.right-header {
				height: 60px;
				border-bottom: 1px solid #CCCCCC;
				padding-right: 20px;
				.toggle-btn {
					i {
						transition: 0.2s linear;
						font-size: 28px;
						margin: 15px 0 0 15px;
						cursor: pointer;
						&.active {
							transform: rotate(90deg);
						}
					}
				}

				.user {
					margin-top: 20px;

					i {
						font-size: 26px;
						margin-right: 20px;
					}
				}
			}
		}
	}
</style>