import React, { Component, lazy } from "react";
import { ReactComponent as IconBugFill } from "bootstrap-icons/icons/bug-fill.svg";
const Search = lazy(() => import("../../components/Search"));

interface InternalServerErrorViewProps {}

interface InternalServerErrorViewState {}

class InternalServerErrorView extends Component<InternalServerErrorViewProps, InternalServerErrorViewState> {
  constructor(props: InternalServerErrorViewProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container text-center p-5">
        <div className="display-1">
          <IconBugFill className="i-va text-warning" width={80} height={80} />
          500
        </div>
        <h1 className="mb-3">Internal Server Error</h1>
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <Search />
          </div>
        </div>
      </div>
    );
  }
}

export default InternalServerErrorView;
