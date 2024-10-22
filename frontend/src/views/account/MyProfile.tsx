import React, { lazy, Component, ChangeEvent } from "react";
const ProfileForm = lazy(() => import("../../components/account/ProfileForm"));
const ChangePasswordForm = lazy(() =>
  import("../../components/account/ChangePasswordForm")
);
const SettingForm = lazy(() => import("../../components/account/SettingForm"));
const CardListForm = lazy(() =>
  import("../../components/account/CardListForm")
);

interface MyProfileViewProps {}

interface MyProfileViewState {
  imagePreview: string;
  isDeleting: boolean;
}

class MyProfileView extends Component<MyProfileViewProps, MyProfileViewState> {
  state: MyProfileViewState = { imagePreview: "", isDeleting: false };

  onSubmitProfile = async (values: any) => {
    alert(JSON.stringify(values));
  };

  onSubmitChangePassword = async (values: any) => {
    alert(JSON.stringify(values));
  };

  onImageChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const val = await this.getBase64(file);
      this.setState({ imagePreview: val as string });
    } else {
      this.setState({ imagePreview: "" });
    }
  };

  getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });
  };

  render() {
    return (
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-4">
            <ProfileForm
              onSubmit={this.onSubmitProfile}
              onImageChange={this.onImageChange}
              imagePreview={this.state.imagePreview}
            />
          </div>
          <div className="col-md-8">
            <ChangePasswordForm onSubmit={this.onSubmitChangePassword} />
            <br />
            <SettingForm />
            <br />
            <CardListForm />
          </div>
        </div>
      </div>
    );
  }
}

export default MyProfileView;
